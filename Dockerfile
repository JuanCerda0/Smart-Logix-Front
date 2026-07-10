# 1. Instalar dependencias (incluyendo devDependencies para compilar)
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Instalar SOLO dependencias de producción para mantener la imagen ligera
FROM node:22-bookworm-slim AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# 3. Imagen final de ejecución (Runner)
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5173

# Copiamos las dependencias de producción y el resultado de la compilación
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

USER node

EXPOSE 5173

# SvelteKit con adapter-node genera el punto de entrada en build/index.js
CMD ["node", "build/index.js"]