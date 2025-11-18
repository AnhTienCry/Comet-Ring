FROM node:20 AS builder

WORKDIR /app

# Copy package files and install ALL deps for build
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Ensure public exists so later COPY --from=builder won't fail
RUN mkdir -p /app/public

# Build project
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
# Copy public/static files (now guaranteed to exist)
COPY --from=builder /app/public ./public/

EXPOSE 4000

CMD ["node", "dist/index.js"]
