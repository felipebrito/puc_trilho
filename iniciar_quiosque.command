#!/bin/bash

# Navega para a pasta onde o script está localizado
cd "$(dirname "$0")"

echo "🚀 Iniciando Sistema PUC Trilho..."

# Mata processos antigos para evitar conflitos de porta
lsof -ti:3000,5173 | xargs kill -9 2>/dev/null || true

# Inicia o App e o Hardware em segundo plano
npm start &

echo "⏳ Aguardando servidores carregarem (15s)..."
sleep 15

echo "🖥️ Abrindo Chrome em modo Kiosk..."

# Abre o Google Chrome no modo Kiosk (Tela cheia absoluta e travada)
# --kiosk: Modo quiosque
# --app: Abre sem barra de endereços
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app=http://localhost:5173

echo "✅ Quiosque iniciado com sucesso!"
