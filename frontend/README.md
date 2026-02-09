# Naksh Jewels - Mini E-commerce Module

A React and Node.js based e-commerce application for jewelry showcasing.

## Features

- **Frontend**: React with Vite, functional components, custom CSS
- **Backend**: Node.js with Express, MongoDB, JWT authentication
- **State Management**: Context API
- **Docker**: Containerized with Docker Compose

## Tech Stack

- React 19
- Node.js
- Express
- MongoDB
- JWT
- Docker

## Setup Instructions

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB (if running locally)

### Local Development

1. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env file with MONGO_URI, JWT_SECRET, PORT
   npm start
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Docker Setup

1. Ensure Docker and Docker Compose are installed.

2. From the project root:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend: http://localhost:5000

### Environment Variables

Create `.env` file in backend directory:
```
MONGO_URI=mongodb://mongo:27017/project
JWT_SECRET=your_secret_key
PORT=5000
```

## API Endpoints

- `GET /products` - Get all products
- `POST /cart` - Add item to cart
- `GET /cart` - Get user cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/delete` - Remove item from cart

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Docker Commands

- Build and run: `docker-compose up --build`
- Run in background: `docker-compose up -d`
- Stop: `docker-compose down`
- Rebuild: `docker-compose up --build --force-recreate`
