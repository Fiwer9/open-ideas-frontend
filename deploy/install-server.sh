#!/usr/bin/env bash
# Однократная подготовка Ubuntu-сервера (Node, PM2, Nginx)
# Запуск на сервере: bash deploy/install-server.sh

set -euo pipefail

echo "==> Обновление пакетов..."
sudo apt-get update -qq

echo "==> Установка базовых утилит..."
sudo apt-get install -y curl git nginx

if ! command -v node >/dev/null 2>&1; then
  echo "==> Установка Node.js 20 (NodeSource)..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "==> Node уже установлен: $(node -v)"
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Установка PM2..."
  sudo npm install -g pm2
else
  echo "==> PM2 уже установлен: $(pm2 -v)"
fi

echo "==> Проверка Docker (не обязателен)..."
if command -v docker >/dev/null 2>&1; then
  echo "    Docker найден: $(docker -v)"
else
  echo "    Docker не установлен — для этого деплоя не нужен."
fi

echo ""
echo "Готово. Версии:"
node -v
npm -v
pm2 -v
nginx -v 2>&1 | head -1

echo ""
echo "Дальше:"
echo "  1) git clone -b gg-team-front https://github.com/AratrumSoft/open-ideas-frontend.git"
echo "  2) cd open-ideas-frontend"
echo "  3) bash deploy/deploy-app.sh"
