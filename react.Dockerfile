FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Переменные NEXT_PUBLIC_* должны быть перед build (build args или .env)
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_TOKEN
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_TOKEN=$NEXT_PUBLIC_BASE_TOKEN

ENV HUSKY=0
RUN npm run build

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]
