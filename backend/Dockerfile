FROM node:20 AS builder

WORKDIR /app

# Copy package files and install ALL deps for build
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime image (slim)
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Copy package.json & production deps metadata
COPY --from=builder /app/package*.json ./

# Install only production deps (ensure network in build environment)
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./dist
# If you need public/static files, copy them too:
COPY --from=builder /app/public ./public || true

EXPOSE 4000

CMD ["node", "dist/index.js"]
