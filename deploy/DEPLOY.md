# Деплой фронтенда на сервер (5.181.252.246)

API без изменений: `http://5.181.252.246:8000`  
Фронт: `http://5.181.252.246` (Nginx → Next.js :3000)

---

## Вариант A: клон с **вашего** GitHub (рекомендуется)

Сделайте репозиторий **Public** — тогда на сервере не нужен токен.

### На вашем ПК (один раз)

1. GitHub → **New repository** → имя `open-ideas-frontend` → **Public**
2. В папке проекта:

```bash
cd "D:\open ideas"
git remote add personal https://github.com/Fiwer9/open-ideas-frontend.git
git push -u personal gg-team-front
```

### На сервере (SSH)

```bash
cd ~
git clone -b gg-team-front https://github.com/Fiwer9/open-ideas-frontend.git
cd open-ideas-frontend

bash deploy/install-server.sh
cp .env.production.example .env.local
bash deploy/deploy-app.sh
bash deploy/setup-nginx.sh
```

Сайт: **http://5.181.252.246**

---

## Вариант B: приватный репозиторий

На сервере при `git clone` нужны логин GitHub и **Personal Access Token** (не пароль).

---

## Обновление после изменений

**ПК:**
```bash
git push personal gg-team-front
```

**Сервер:**
```bash
cd ~/open-ideas-frontend
git pull
bash deploy/deploy-app.sh
```

---

## CORS (если API блокирует запросы)

На Django:
```python
CORS_ALLOWED_ORIGINS = ["http://5.181.252.246"]
```

---

## Полезные команды

```bash
pm2 status
pm2 logs open-ideas
curl -I http://127.0.0.1:3000
systemctl status nginx
```

---

## Обрыв SSH / «Network error: Software caused connection abort»

Сборка Next.js тяжёлая. На слабом VPS SSH часто рвётся из‑за нехватки RAM (OOM).

### 1. Подключитесь снова и проверьте память

```bash
free -h
dmesg | tail -30 | grep -i -E 'kill|oom'
```

### 2. Добавьте swap (один раз, ~2 ГБ)

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

### 3. Запускайте сборку в screen (переживёт обрыв PuTTY)

```bash
apt-get install -y screen
screen -S build
cd ~/open-ideas-frontend
bash deploy/deploy-app.sh
```

Отсоединиться от screen: **Ctrl+A**, затем **D**.  
Вернуться: `screen -r build`

После успешной сборки:

```bash
bash deploy/setup-nginx.sh
```

### PuTTY: увеличить keepalive

Connection → Seconds between keepalives: **30**
