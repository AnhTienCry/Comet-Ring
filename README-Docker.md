# Comet Ring - Docker Setup

This project is containerized using Docker for easy deployment and development.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd comet-ring
   ```

2. Start all services:
   ```bash
   docker-compose up -d
   ```

3. The application will be available at:
   - Frontend: http://localhost
   - Backend API: http://localhost:4000
   - MongoDB: localhost:27017

## Services

- **frontend**: React application served by Nginx (port 80)
- **backend**: Node.js/Express API server (port 4000)
- **mongo**: MongoDB database (port 27017)

## Development

To run in development mode with hot reload:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` files in both `backend` and `frontend` directories if needed.

Backend default environment:
- `NODE_ENV=production`
- `MONGODB_URI=mongodb://mongo:27017/comet-ring`

## File Uploads

Uploaded images are stored in `backend/uploads` directory and served at `/uploads` endpoint.

## Stopping Services

```bash
docker-compose down
```

## Rebuilding

If you make changes to Dockerfiles:

```bash
docker-compose up --build
```