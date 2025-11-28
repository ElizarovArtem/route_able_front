# Этап 1: сборка фронта
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Этап 2: nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Копируем сборку фронта
COPY --from=builder /app/dist .

# Конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
