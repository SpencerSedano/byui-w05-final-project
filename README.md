# CS341 Web Services API

A RESTful API built with Node.js, Express, and MongoDB, featuring two collections (Users and Products) with full CRUD operations, comprehensive error handling, and Swagger documentation.

## Features

- **Two Complete Collections**: Users and Products with full CRUD operations
- **Comprehensive Validation**: Input validation using express-validator
- **Error Handling**: Detailed error responses with proper HTTP status codes
- **API Documentation**: Interactive Swagger documentation at `/api-docs`
- **Logging**: Morgan middleware for request logging
- **Search & Filtering**: Advanced search and filtering capabilities
- **Deployment Ready**: Configured for Render deployment

## API Collections

### Users Collection

- **GET** `/api/users` - Get all users (with pagination and search)
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Products Collection

- **GET** `/api/products` - Get all products (with filtering and pagination)
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product
