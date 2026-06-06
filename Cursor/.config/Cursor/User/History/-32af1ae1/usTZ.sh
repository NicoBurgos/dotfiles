#!/bin/bash

echo "🔍 Diagnóstico de la aplicación de inversiones"
echo "=============================================="

echo ""
echo "1. Verificando contenedores Docker..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "2. Verificando logs del backend..."
echo "--- Backend logs (últimas 10 líneas) ---"
docker logs inversiones_backend --tail 10

echo ""
echo "3. Verificando logs del frontend..."
echo "--- Frontend logs (últimas 10 líneas) ---"
docker logs inversiones_frontend --tail 10

echo ""
echo "4. Verificando conectividad del backend..."
echo "--- Test ping al backend ---"
curl -s http://localhost:8080/ping || echo "❌ Backend no responde"

echo ""
echo "5. Verificando endpoint de portfolio..."
echo "--- Test portfolio endpoint ---"
curl -s http://localhost:8080/portfolio | head -c 200 || echo "❌ Portfolio endpoint no responde"

echo ""
echo "6. Verificando base de datos..."
echo "--- Test conexión a PostgreSQL ---"
docker exec inversiones_db psql -U inversiones -d inversiones -c "SELECT COUNT(*) FROM transactions;" 2>/dev/null || echo "❌ No se puede conectar a la base de datos"

echo ""
echo "✅ Diagnóstico completado"
echo ""
echo "Si hay errores, ejecuta:"
echo "  docker-compose down"
echo "  docker-compose up --build"
