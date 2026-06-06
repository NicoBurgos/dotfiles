<script>
  import Chart from './Chart.svelte';
  import { onMount } from 'svelte';

  let portfolio = [];
  let transactions = [];
  let loading = true;
  let showAddForm = false;
  let activeTab = 'overview';
  let totalInvested = 0;
  let totalCurrent = 0;
  let totalProfit = 0;
  let totalPctGain = 0;

  // Configuración de la URL del backend
  const API_BASE_URL = typeof window !== 'undefined' 
    ? (window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'http://backend:8080')
    : 'http://backend:8080';

  onMount(async () => {
    await loadPortfolio();
  });

  async function loadPortfolio() {
    loading = true;
    try {
      const [portfolioRes, transactionsRes] = await Promise.all([
        fetch('http://backend:8080/portfolio'),
        fetch('http://backend:8080/transactions')
      ]);
      
      portfolio = await portfolioRes.json();
      transactions = await transactionsRes.json();
      
      // Calcular totales
      totalInvested = portfolio.reduce((sum, asset) => sum + asset.invested, 0);
      totalCurrent = portfolio.reduce((sum, asset) => sum + asset.current, 0);
      totalProfit = totalCurrent - totalInvested;
      totalPctGain = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
    } catch (error) {
      console.error('Error loading data:', error);
    }
    loading = false;
  }

  function toggleAddForm() {
    showAddForm = !showAddForm;
  }

  function closeAddForm() {
    showAddForm = false;
  }

  async function addTransaction(event) {
    const form = event.target;
    const formData = new FormData(form);
    
    const transaction = {
      asset: formData.get('asset').toUpperCase(),
      type: formData.get('type'),
      qty: parseFloat(formData.get('qty')),
      price_ars: parseFloat(formData.get('price')),
      date: formData.get('date')
    };

    try {
      const response = await fetch('http://backend:8080/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
      });

      if (response.ok) {
        // Recargar el portfolio
        await loadPortfolio();
        closeAddForm();
        // Resetear el formulario
        form.reset();
      } else {
        alert('Error al agregar la transacción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  }
</script>

<div class="dashboard">
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <h1><i class="fas fa-chart-line"></i> Mis Inversiones</h1>
      <button class="add-btn" on:click={toggleAddForm}>
        <i class="fas fa-plus"></i> Agregar Inversión
      </button>
    </div>
  </header>

  <!-- Summary Cards -->
  {#if !loading && portfolio.length > 0}
    <div class="summary-cards">
      <div class="card">
        <div class="card-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="card-content">
          <h3>Total Invertido</h3>
          <p class="amount">${totalInvested.toFixed(2)}</p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="card-content">
          <h3>Valor Actual</h3>
          <p class="amount">${totalCurrent.toFixed(2)}</p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-icon {totalProfit >= 0 ? 'profit' : 'loss'}">
          <i class="fas {totalProfit >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i>
        </div>
        <div class="card-content">
          <h3>Ganancia/Pérdida</h3>
          <p class="amount {totalProfit >= 0 ? 'profit' : 'loss'}">
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
          </p>
          <p class="percentage {totalProfit >= 0 ? 'profit' : 'loss'}">
            {totalPctGain >= 0 ? '+' : ''}{totalPctGain.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Navigation Tabs -->
  <div class="tabs">
    <button 
      class="tab {activeTab === 'overview' ? 'active' : ''}" 
      on:click={() => activeTab = 'overview'}
    >
      <i class="fas fa-chart-pie"></i> Resumen
    </button>
    <button 
      class="tab {activeTab === 'stocks' ? 'active' : ''}" 
      on:click={() => activeTab = 'stocks'}
    >
      <i class="fas fa-chart-line"></i> Acciones
    </button>
    <button 
      class="tab {activeTab === 'crypto' ? 'active' : ''}" 
      on:click={() => activeTab = 'crypto'}
    >
      <i class="fab fa-bitcoin"></i> Criptos
    </button>
    <button 
      class="tab {activeTab === 'history' ? 'active' : ''}" 
      on:click={() => activeTab = 'history'}
    >
      <i class="fas fa-history"></i> Historial
    </button>
  </div>

  <!-- Content Area -->
  <main class="main-content">
    {#if loading}
      <div class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Cargando inversiones...</p>
      </div>
    {:else if portfolio.length === 0}
      <div class="empty-state">
        <i class="fas fa-chart-line"></i>
        <h3>No tienes inversiones aún</h3>
        <p>Comienza agregando tu primera inversión</p>
        <button class="add-btn" on:click={toggleAddForm}>
          <i class="fas fa-plus"></i> Agregar Primera Inversión
        </button>
      </div>
    {:else}
      <!-- Overview Tab -->
      {#if activeTab === 'overview'}
        <div class="overview">
          <div class="charts-section">
            <div class="chart-row">
              <div class="chart-container">
                <h3>Distribución del Portfolio</h3>
                <Chart client:only data={portfolio} chartType="pie" height={300} />
              </div>
              <div class="chart-container">
                <h3>Comparación Invertido vs Actual</h3>
                <Chart client:only data={portfolio} chartType="bar" height={300} />
              </div>
            </div>
            <div class="chart-container full-width">
              <h3>Evolución del Portfolio</h3>
              <Chart client:only data={portfolio} chartType="line" height={400} />
            </div>
          </div>
          
          <div class="assets-grid">
            {#each portfolio as asset}
              <div class="asset-card">
                <div class="asset-header">
                  <h3>{asset.asset}</h3>
                  <span class="asset-type {asset.type}">
                    {asset.type === 'crypto' ? 'Crypto' : 'Acción'}
                  </span>
                </div>
                <div class="asset-metrics">
                  <div class="metric">
                    <span class="label">Invertido:</span>
                    <span class="value">${asset.invested.toFixed(2)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Actual:</span>
                    <span class="value">${asset.current.toFixed(2)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Ganancia:</span>
                    <span class="value {asset.profit >= 0 ? 'profit' : 'loss'}">
                      {asset.profit >= 0 ? '+' : ''}${asset.profit.toFixed(2)}
                    </span>
                  </div>
                  <div class="metric">
                    <span class="label">%:</span>
                    <span class="value {asset.pct_gain >= 0 ? 'profit' : 'loss'}">
                      {asset.pct_gain >= 0 ? '+' : ''}{asset.pct_gain.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Stocks Tab -->
      {#if activeTab === 'stocks'}
        <div class="stocks-view">
          <h2>Acciones</h2>
          <div class="assets-list">
            {#each portfolio.filter(asset => asset.type === 'stock') as asset}
              <div class="asset-item">
                <div class="asset-info">
                  <h3>{asset.asset}</h3>
                  <p>Cantidad: {asset.qty}</p>
                </div>
                <div class="asset-values">
                  <div class="value">
                    <span class="label">Invertido:</span>
                    <span>${asset.invested.toFixed(2)}</span>
                  </div>
                  <div class="value">
                    <span class="label">Actual:</span>
                    <span>${asset.current.toFixed(2)}</span>
                  </div>
                  <div class="value {asset.profit >= 0 ? 'profit' : 'loss'}">
                    <span class="label">Ganancia:</span>
                    <span>{asset.profit >= 0 ? '+' : ''}${asset.profit.toFixed(2)} ({asset.pct_gain >= 0 ? '+' : ''}{asset.pct_gain.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Crypto Tab -->
      {#if activeTab === 'crypto'}
        <div class="crypto-view">
          <h2>Criptomonedas</h2>
          <div class="assets-list">
            {#each portfolio.filter(asset => asset.type === 'crypto') as asset}
              <div class="asset-item">
                <div class="asset-info">
                  <h3>{asset.asset}</h3>
                  <p>Cantidad: {asset.qty}</p>
                </div>
                <div class="asset-values">
                  <div class="value">
                    <span class="label">Invertido:</span>
                    <span>${asset.invested.toFixed(2)}</span>
                  </div>
                  <div class="value">
                    <span class="label">Actual:</span>
                    <span>${asset.current.toFixed(2)}</span>
                  </div>
                  <div class="value {asset.profit >= 0 ? 'profit' : 'loss'}">
                    <span class="label">Ganancia:</span>
                    <span>{asset.profit >= 0 ? '+' : ''}${asset.profit.toFixed(2)} ({asset.pct_gain >= 0 ? '+' : ''}{asset.pct_gain.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- History Tab -->
      {#if activeTab === 'history'}
        <div class="history-view">
          <h2>Historial de Transacciones</h2>
          {#if transactions.length > 0}
            <div class="transactions-table">
              <div class="table-header">
                <div class="header-cell">Fecha</div>
                <div class="header-cell">Activo</div>
                <div class="header-cell">Tipo</div>
                <div class="header-cell">Cantidad</div>
                <div class="header-cell">Precio ARS</div>
                <div class="header-cell">Precio USD</div>
                <div class="header-cell">Total USD</div>
              </div>
              {#each transactions as transaction}
                <div class="table-row">
                  <div class="table-cell">
                    {new Date(transaction.date).toLocaleDateString('es-ES')}
                  </div>
                  <div class="table-cell asset-symbol">
                    {transaction.asset}
                  </div>
                  <div class="table-cell">
                    <span class="asset-type {transaction.type}">
                      {transaction.type === 'crypto' ? 'Crypto' : 'Acción'}
                    </span>
                  </div>
                  <div class="table-cell">
                    {transaction.qty.toFixed(8)}
                  </div>
                  <div class="table-cell">
                    ${transaction.price_ars.toFixed(2)}
                  </div>
                  <div class="table-cell">
                    ${transaction.price_usd.toFixed(2)}
                  </div>
                  <div class="table-cell total">
                    ${(transaction.qty * transaction.price_usd).toFixed(2)}
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="empty-state">
              <i class="fas fa-history"></i>
              <h3>No hay transacciones</h3>
              <p>Agrega tu primera inversión para ver el historial</p>
            </div>
          {/if}
        </div>
      {/if}
    {/if}
  </main>

  <!-- Add Investment Modal -->
  {#if showAddForm}
    <div class="modal-overlay" on:click={closeAddForm} on:keydown={(e) => e.key === 'Escape' && closeAddForm()} role="dialog" tabindex="-1">
      <div class="modal" on:click|stopPropagation role="dialog" tabindex="-1">
        <div class="modal-header">
          <h2>Agregar Nueva Inversión</h2>
          <button class="close-btn" on:click={closeAddForm}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-content">
          <form on:submit={addTransaction}>
            <div class="form-group">
              <label for="asset">Símbolo del Activo</label>
              <input type="text" id="asset" name="asset" placeholder="Ej: BTC, AAPL, ETH" required>
            </div>
            
            <div class="form-group">
              <label for="type">Tipo</label>
              <select id="type" name="type" required>
                <option value="">Seleccionar tipo</option>
                <option value="crypto">Criptomoneda</option>
                <option value="stock">Acción</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="qty">Cantidad</label>
              <input type="number" id="qty" name="qty" step="0.00000001" placeholder="0.00000000" required>
            </div>
            
            <div class="form-group">
              <label for="price">Precio en ARS</label>
              <input type="number" id="price" name="price" step="0.01" placeholder="0.00" required>
            </div>
            
            <div class="form-group">
              <label for="date">Fecha de Compra</label>
              <input type="date" id="date" name="date" required>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" on:click={closeAddForm}>Cancelar</button>
              <button type="submit" class="btn-primary">Agregar Inversión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard {
    min-height: 100vh;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .header h1 {
    color: white;
    font-size: 2rem;
    font-weight: 600;
  }

  .header h1 i {
    margin-right: 10px;
  }

  .add-btn {
    background: linear-gradient(45deg, #4CAF50, #45a049);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 25px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    background: linear-gradient(45deg, #667eea, #764ba2);
  }

  .card-icon.profit {
    background: linear-gradient(45deg, #4CAF50, #45a049);
  }

  .card-icon.loss {
    background: linear-gradient(45deg, #f44336, #d32f2f);
  }

  .card-content h3 {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-content .amount {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .card-content .percentage {
    font-size: 1rem;
    font-weight: 600;
    margin: 5px 0 0 0;
  }

  .profit {
    color: #4CAF50;
  }

  .loss {
    color: #f44336;
  }

  .tabs {
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 5px;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow-x: auto;
  }

  .tab {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    padding: 15px 25px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 500;
  }

  .tab:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .tab.active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .main-content {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-height: 400px;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #666;
  }

  .loading i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #667eea;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    color: #666;
  }

  .empty-state i {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #ccc;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }

  .empty-state p {
    margin-bottom: 30px;
    font-size: 1.1rem;
  }

  .charts-section {
    margin-bottom: 40px;
  }

  .chart-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .chart-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e9ecef;
  }

  .chart-container.full-width {
    grid-column: 1 / -1;
  }

  .chart-container h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .asset-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
  }

  .asset-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .asset-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .asset-header h3 {
    color: #333;
    font-size: 1.2rem;
    margin: 0;
  }

  .asset-type {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .asset-type.crypto {
    background: #e3f2fd;
    color: #1976d2;
  }

  .asset-type.stock {
    background: #f3e5f5;
    color: #7b1fa2;
  }

  .asset-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .metric .label {
    color: #666;
    font-size: 0.9rem;
  }

  .metric .value {
    font-weight: 600;
    color: #333;
  }

  .assets-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .asset-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;
    flex-wrap: wrap;
    gap: 15px;
  }

  .asset-info h3 {
    color: #333;
    font-size: 1.2rem;
    margin: 0 0 5px 0;
  }

  .asset-info p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }

  .asset-values {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }

  .value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .value .label {
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 2px;
  }

  .value span:last-child {
    font-weight: 600;
    color: #333;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal {
    background: white;
    border-radius: 15px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    border-bottom: 1px solid #e9ecef;
  }

  .modal-header h2 {
    color: #333;
    margin: 0;
    font-size: 1.5rem;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    background: #f8f9fa;
    color: #333;
  }

  .modal-content {
    padding: 30px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 600;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 30px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: #f8f9fa;
    color: #666;
    border: 2px solid #e9ecef;
  }

  .btn-secondary:hover {
    background: #e9ecef;
    color: #333;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .dashboard {
      padding: 15px;
    }

    .header-content {
      flex-direction: column;
      text-align: center;
    }

    .header h1 {
      font-size: 1.5rem;
    }

    .summary-cards {
      grid-template-columns: 1fr;
    }

    .tabs {
      flex-direction: column;
    }

    .tab {
      justify-content: center;
    }

    .chart-row {
      grid-template-columns: 1fr;
    }

    .assets-grid {
      grid-template-columns: 1fr;
    }

    .asset-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .asset-values {
      width: 100%;
      justify-content: space-between;
    }

    .modal {
      margin: 10px;
    }

    .modal-content {
      padding: 20px;
    }

    .form-actions {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .card {
      flex-direction: column;
      text-align: center;
    }

    .card-icon {
      margin: 0 auto;
    }

    .asset-values {
      flex-direction: column;
      gap: 10px;
    }

  .value {
    align-items: flex-start;
  }
}

/* Transactions Table Styles */
.transactions-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e9ecef;
}

.header-cell {
  padding: 15px 12px;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 15px 12px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #333;
}

.table-cell.asset-symbol {
  font-weight: 600;
  color: #667eea;
}

.table-cell.total {
  font-weight: 600;
  color: #333;
}

/* Responsive table */
@media (max-width: 1200px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    font-size: 0.8rem;
  }
  
  .header-cell,
  .table-cell {
    padding: 10px 8px;
  }
}

@media (max-width: 768px) {
  .transactions-table {
    overflow-x: auto;
  }
  
  .table-header,
  .table-row {
    min-width: 600px;
  }
  
  .header-cell,
  .table-cell {
    padding: 8px 6px;
    font-size: 0.75rem;
  }
}
</style>