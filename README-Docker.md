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

# Comet Ring - Docker Hub Deployment

## Quick Start

```bash
# 1. Download docker-compose file
curl -o docker-compose.yml https://raw.githubusercontent.com/yourname/comet-ring/main/docker-compose.hub.yml

# 2. (Optional) Set environment variables
export JWT_SECRET=your-secret-key

# 3. Run the stack
docker-compose up -d

# 4. Seed database (optional)
docker-compose exec backend npm run seed
```

## Access
- Frontend: http://localhost
- Backend API: http://localhost:4000/api
- Admin login: admin@cometring.com

## Services
- `anhtiencry/comet-ring:backend` - Node.js API (269 MB)
- `anhtiencry/comet-ring:frontend` - React + Nginx (80 MB)
- `mongo:7.0` - MongoDB database

## Ports
- 80: Frontend (nginx)
- 4000: Backend API
- 27017: MongoDB (internal only)

## Volumes
- `mongo_data`: MongoDB persistent storage
- `uploads_data`: User uploaded images

## Environment Variables
- `JWT_SECRET`: JWT signing secret (change in production!)
- `MONGODB_URI`: MongoDB connection string
- `BACKEND_URL`: Backend public URL

## Management Commands
```bash
# View logs
docker-compose logs -f backend

# Restart service
docker-compose restart backend

# Stop all
docker-compose down

# Remove all data
docker-compose down -v
```