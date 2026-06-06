package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var db *sqlx.DB

type Transaction struct {
	ID         int       `db:"id" json:"id"`
	Asset      string    `db:"asset_symbol" json:"asset"`
	Type       string    `db:"asset_type" json:"type"`
	Qty        float64   `db:"qty" json:"qty"`
	PriceARS   float64   `db:"price_ars" json:"price_ars"`
	FxRateUSD  float64   `db:"fx_rate_usd" json:"fx_rate_usd"`
	PriceUSD   float64   `db:"price_usd" json:"price_usd"`
	Date       time.Time `db:"date" json:"date"`
}

type Price struct {
	Asset     string    `db:"asset_symbol" json:"asset"`
	Type      string    `db:"asset_type" json:"type"`
	PriceUSD  float64   `db:"price_usd" json:"price_usd"`
	Timestamp time.Time `db:"timestamp" json:"timestamp"`
}

func main() {
	// --- DB connection ---
	dbHost := getenv("DB_HOST", "localhost")
	dbPort := getenv("DB_PORT", "5432")
	dbUser := getenv("DB_USER", "inversiones")
	dbPass := getenv("DB_PASS", "inversiones")
	dbName := getenv("DB_NAME", "inversiones")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPass, dbName)

	var err error
	db, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatal("Error conectando a DB:", err)
	}
	defer db.Close()

	app := fiber.New()

	// --- Endpoints ---
	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("pong")
	})

	app.Post("/transactions", addTransaction)
	app.Get("/transactions", getTransactions)
	app.Get("/portfolio", getPortfolio)
	app.Get("/prices/:asset", getPrice)

	// --- Cron precios cada 10 min ---
	ticker := time.NewTicker(10 * time.Minute)
	go func() {
		for range ticker.C {
			updateCryptoPrice("bitcoin", "crypto")
			updateStockPrice("AAPL", "stock")
		}
	}()

	log.Println("Backend en :8080")
	log.Fatal(app.Listen(":8080"))
}

// --- Handlers ---

func addTransaction(c *fiber.Ctx) error {
	var t Transaction
	if err := c.BodyParser(&t); err != nil {
		return c.Status(400).SendString("Invalid JSON")
	}

	// Obtener fx ARS→USD
	fx, err := getFXRate()
	if err != nil {
		return c.Status(500).SendString("Error FX")
	}
	t.FxRateUSD = fx
	t.PriceUSD = t.PriceARS / fx

	_, err = db.NamedExec(`INSERT INTO transactions 
		(asset_symbol, asset_type, qty, price_ars, fx_rate_usd, price_usd, date) 
		VALUES (:asset_symbol, :asset_type, :qty, :price_ars, :fx_rate_usd, :price_usd, :date)`, &t)

	if err != nil {
		return c.Status(500).SendString("DB error")
	}

	return c.JSON(t)
}

func getPortfolio(c *fiber.Ctx) error {
	type Holding struct {
		Asset     string  `json:"asset"`
		TotalQty  float64 `json:"qty"`
		AvgPrice  float64 `json:"avg_price"`
		Invested  float64 `json:"invested"`
		Current   float64 `json:"current"`
		Profit    float64 `json:"profit"`
		PctGain   float64 `json:"pct_gain"`
	}

	// Calcular por asset
	rows, err := db.Queryx("SELECT DISTINCT asset_symbol, asset_type FROM transactions")
	if err != nil {
		return c.Status(500).SendString("DB error")
	}

	var holdings []Holding
	for rows.Next() {
		var asset, atype string
		rows.Scan(&asset, &atype)

		var qty, invested float64
		db.Get(&qty, "SELECT COALESCE(SUM(qty),0) FROM transactions WHERE asset_symbol=$1", asset)
		db.Get(&invested, "SELECT COALESCE(SUM(qty*price_usd),0) FROM transactions WHERE asset_symbol=$1", asset)

		avg := invested / qty

		// precio actual
		var price Price
		db.Get(&price, "SELECT price_usd,timestamp FROM prices WHERE asset_symbol=$1 ORDER BY timestamp DESC LIMIT 1", asset)
		current := price.PriceUSD * qty
		profit := current - invested
		pct := (profit / invested) * 100

		holdings = append(holdings, Holding{
			Asset:    asset,
			TotalQty: qty,
			AvgPrice: avg,
			Invested: invested,
			Current:  current,
			Profit:   profit,
			PctGain:  pct,
		})
	}

	return c.JSON(holdings)
}

func getPrice(c *fiber.Ctx) error {
	asset := c.Params("asset")
	var price Price
	err := db.Get(&price, "SELECT * FROM prices WHERE asset_symbol=$1 ORDER BY timestamp DESC LIMIT 1", asset)
	if err != nil {
		return c.Status(404).SendString("No price")
	}
	return c.JSON(price)
}

// --- Utils ---

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func getFXRate() (float64, error) {
	resp, err := http.Get("https://api.exchangerate.host/latest?base=ARS&symbols=USD")
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&data)
	rates := data["rates"].(map[string]interface{})
	return rates["USD"].(float64), nil
}

func updateCryptoPrice(asset string, assetType string) {
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/simple/price?ids=%s&vs_currencies=usd", asset)
	resp, err := http.Get(url)
	if err != nil {
		log.Println("Error CoinGecko:", err)
		return
	}
	defer resp.Body.Close()

	var data map[string]map[string]float64
	json.NewDecoder(resp.Body).Decode(&data)
	price := data[asset]["usd"]

	db.Exec("INSERT INTO prices(asset_symbol, asset_type, price_usd, timestamp) VALUES ($1,$2,$3,NOW())", asset, assetType, price)
	log.Println("Precio cripto actualizado:", asset, price)
}

func updateStockPrice(symbol string, assetType string) {
	key := os.Getenv("ALPHA_VANTAGE_KEY")
	url := fmt.Sprintf("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", symbol, key)
	resp, err := http.Get(url)
	if err != nil {
		log.Println("Error AlphaVantage:", err)
		return
	}
	defer resp.Body.Close()

	var data map[string]map[string]string
	json.NewDecoder(resp.Body).Decode(&data)
	priceStr := data["Global Quote"]["05. price"]

	var price float64
	fmt.Sscanf(priceStr, "%f", &price)

	db.Exec("INSERT INTO prices(asset_symbol, asset_type, price_usd, timestamp) VALUES ($1,$2,$3,NOW())", symbol, assetType, price)
	log.Println("Precio stock actualizado:", symbol, price)
}
