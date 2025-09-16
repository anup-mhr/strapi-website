# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/next.config.ts .
COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY .env ./
CMD ["npm", "start"]