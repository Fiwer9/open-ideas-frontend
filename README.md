# Открытые идеи

Корпоративная платформа для сбора, рассмотрения и учёта инициатив сотрудников.

Фронтенд на **Next.js 13**, **React 18**, **TypeScript**, **Ant Design** и **Redux Toolkit**.  
Подключается к REST API бэкенда (Django + JWT).

## Возможности

- Регистрация и вход по корпоративной почте
- Подача и просмотр инициатив, комментарии, лайки
- Рейтинг сотрудников
- Панель администратора (для staff-пользователей)
- Жизненный цикл инициативы: от регистрации до выполнения или отклонения

## Стек

| Категория | Технологии |
|-----------|------------|
| Framework | Next.js 13, React 18 |
| Язык | TypeScript |
| UI | Ant Design 5, SCSS |
| Состояние | Redux Toolkit |
| HTTP | Axios |
| Тесты | Jest, Testing Library |

## Требования

- **Node.js** 18.x или новее
- **npm** 9+
- Работающий **бэкенд API** с JWT-авторизацией

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone <URL-репозитория>
cd open-ideas
```

### 2. Установить зависимости

```bash
npm ci
```

Если `package-lock.json` отсутствует:

```bash
npm install
```

### 3. Настроить переменные окружения

```bash
cp .env.example .env.local
```

Пример:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_BASE_TOKEN=http://localhost:8000
```

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_BASE_URL` | Базовый URL API с префиксом `/api` |
| `NEXT_PUBLIC_BASE_TOKEN` | URL для JWT (`/token/create/`, `/token/refresh/`) без `/api` |

### 4. Запустить dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### 5. Production

```bash
npm run build
npm run start
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Режим разработки |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск собранного приложения |
| `npm run lint` | ESLint |
| `npm test` | Тесты |
| `npm run format` | Prettier |

## API

Основные группы эндпоинтов бэкенда:

- `/api/queries/` — инициативы
- `/api/users/` — пользователи
- `/api/organizations/` — организации и отделы
- `/api/auth/` — регистрация
- `/token/create/`, `/token/refresh/` — JWT (без `/api`)
- `/analytics/` — аналитика (без `/api`)

Для локальной разработки настройте **CORS** на бэкенде для `http://localhost:3000`.

## Структура

```
components/   UI-компоненты
pages/        Маршруты Next.js
redux/        Redux slices
services/     HTTP-сервисы
http/         Axios-клиент
utils/        Утилиты
models/       Типы API
public/       Статика
```

## Публикация на GitHub

```bash
git init
git add .
git commit -m "Initial commit: Open Ideas frontend"
git remote add origin https://github.com/<user>/<repo>.git
git branch -M main
git push -u origin main
```

Не коммитьте `.env.local` — файл в `.gitignore`.

## Docker (опционально)

В репозитории есть `react.Dockerfile` и `docker-compose.yml` для запуска фронтенда в контейнере.  
Перед запуском задайте переменные окружения и при необходимости настройте внешнюю сеть в `docker-compose.yml`.

## Передача проекту

Передайте ссылку на репозиторий или архив без `node_modules` и `.env.local`.  
URL API и тестовые логины отправляйте отдельно, не в git.
