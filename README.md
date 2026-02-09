# Naksh Jewels E-Commerce Module

A mini e-commerce application built with React (frontend) and Node.js/Express (backend) for product browsing and cart management.

## Features

### Frontend (React)
- Product listing page with filtering by material (Gold, Silver, Diamond)
- Product cards displaying image, name, price, and Add to Cart functionality
- Cart page with quantity updates and item removal
- State management using React Context API
- Responsive design with custom CSS
- User authentication (login/register)

### Backend (Node.js + Express)
- RESTful APIs for products and cart operations
- User authentication with JWT
- MongoDB for data storage
- Input validation and error handling
- CORS enabled for frontend communication

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Containerization**: Docker, Docker Compose

## Project Structure

```
online_new/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
├── backend/           # Node.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Node.js (for local development)
- MongoDB (for local development)

### Using Docker (Recommended)

1. Clone the repository
2. Navigate to the project root directory
3. Run the application:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000 (as per docker-compose)

### Local Development

#### Backend Setup
1. Navigate to `backend/` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/project
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```
4. Start MongoDB locally
5. Run the server:
   ```bash
   npm start
   ```
   or with nodemon:
   ```bash
   npx nodemon server.js
   ```

#### Frontend Setup
1. Navigate to `frontend/` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access at http://localhost:5173

## API Endpoints

### Products
- `GET /product/getallproducts` - Get all products

### Cart
- `POST /cart/addtocartbyid/:productId` - Add product to cart
- `GET /cart/getcartproducts` - Get user's cart
- `PUT /cart/updatecartproduct/:productId` - Update item quantity
- `DELETE /cart/deletecartproduct/:productId` - Remove item from cart

### Authentication
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/getprofile` - Get user profile
- `POST /user/logout` - User logout

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default 4000)

## Docker Configuration

The application uses Docker Compose with:
- MongoDB service
- Backend service (Node.js)
- Frontend service (Nginx serving built React app)

To rebuild and run:
```bash
docker-compose up --build --force-recreate
```

## Development Notes

- Frontend makes API calls to `http://localhost:4000` (adjust for Docker vs local)
- Authentication uses HTTP-only cookies
- Product images are stored locally in `frontend/src/assets/`
- Cart data persists in MongoDB

## Screenshots

(Add screenshots of the application here if available)

## Demo Video

(Link to demo video if available)