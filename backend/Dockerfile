FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript -> dist/
RUN npm run build

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["npm", "run", "start"]
