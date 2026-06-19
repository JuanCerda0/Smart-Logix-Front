FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package.json package-lock.json svelte.config.js vite.config.ts tsconfig.json ./
COPY src/app.html ./src/app.html
RUN npm ci

FROM deps AS build

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner

WORKDIR /app/build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5173

COPY --from=build /app/build ./
RUN cp -r client server/chunks/client

USER node

EXPOSE 5173

CMD ["node", "index.js"]
