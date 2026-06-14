#!/usr/bin/env bash
# Подключение конфига Nginx (порт 80 → Next.js :3000)
# Запуск из корня репозитория: bash deploy/setup-nginx.sh

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CONF_SRC="$APP_DIR/deploy/nginx-open-ideas.conf"
CONF_DST="/etc/nginx/sites-available/open-ideas"

if [ ! -f "$CONF_SRC" ]; then
  echo "Не найден $CONF_SRC"
  exit 1
fi

echo "==> Копирую конфиг Nginx..."
sudo cp "$CONF_SRC" "$CONF_DST"
sudo ln -sf "$CONF_DST" /etc/nginx/sites-enabled/open-ideas
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Проверка конфигурации..."
sudo nginx -t

echo "==> Перезагрузка Nginx..."
sudo systemctl enable nginx
sudo systemctl reload nginx

echo ""
echo "Готово. Сайт должен открываться: http://5.181.252.246"
echo "API по-прежнему: http://5.181.252.246:8000"
