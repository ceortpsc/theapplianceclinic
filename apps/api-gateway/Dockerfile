FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
COPY apps/api-gateway/package*.json ./apps/api-gateway/
COPY packages/database/package*.json ./packages/database/
COPY packages/common/package*.json ./packages/common/
RUN npm ci --workspace=apps/api-gateway --workspace=packages/database --workspace=packages/common

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=packages/database
RUN npm run build --workspace=packages/common
RUN npm run build --workspace=apps/api-gateway

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/database/src ./packages/database/src

EXPOSE 4000
CMD ["node", "dist/main"]
