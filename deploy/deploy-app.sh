#!/usr/bin/env bash
# Сборка и запуск приложения (из корня репозитория на сервере)
# Запуск: bash deploy/deploy-app.sh

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

echo "==> Рабочая папка: $APP_DIR"

if [ ! -f .env.local ]; then
  if [ -f .env.production.example ]; then
    echo "==> Создаю .env.local из .env.production.example"
    cp .env.production.example .env.local
  else
    echo "Ошибка: нет .env.local. Создайте файл с NEXT_PUBLIC_BASE_URL и NEXT_PUBLIC_BASE_TOKEN"
    exit 1
  fi
fi

echo "==> Установка зависимостей..."
export HUSKY=0
npm ci

echo "==> Production-сборка..."
npm run build

echo "==> Запуск через PM2..."
if pm2 describe open-ideas >/dev/null 2>&1; then
  pm2 restart ecosystem.config.js
else
  pm2 start ecosystem.config.js
fi

pm2 save

echo ""
echo "==> Статус:"
pm2 status open-ideas

echo ""
echo "Фронтенд слушает http://127.0.0.1:3000"
echo "Настройте Nginx (см. deploy/DEPLOY.md), затем откройте http://5.181.252.246"
