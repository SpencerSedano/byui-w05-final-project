# CS341 Web Services API

A RESTful API built with Node.js, Express, and MongoDB, featuring two collections (Users and Products) with full CRUD operations, comprehensive error handling, and Swagger documentation.

## 🚀 Features

- **Two Complete Collections**: Users and Products with full CRUD operations
- **Comprehensive Validation**: Input validation using express-validator
- **Error Handling**: Detailed error responses with proper HTTP status codes
- **API Documentation**: Interactive Swagger documentation at `/api-docs`
- **Security**: Helmet.js for security headers, CORS support
- **Logging**: Morgan middleware for request logging
- **Pagination**: Support for paginated responses
- **Search & Filtering**: Advanced search and filtering capabilities
- **MongoDB Integration**: Mongoose ODM with schema validation
- **Deployment Ready**: Configured for Render deployment

## 📚 API Collections

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

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd week-5
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**

   Copy the `.env` file and update with your MongoDB connection string:
   \`\`\`env
   PORT=3000
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
   NODE_ENV=development
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Documentation: `http://localhost:3000/api-docs`

## 🌐 Deployment to Render

### Steps to Deploy:

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit - CS341 Web Services API"
   git push origin main
   \`\`\`

2. **Create Render Service**

   - Go to [Render.com](https://render.com)
   - Connect your GitHub repository
   - Create a new Web Service
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Configure Environment Variables in Render**

   - Add `MONGODB_URI` with your MongoDB connection string
   - Add `NODE_ENV` set to `production`

4. **Access your deployed API**
   - Your API will be available at: `https://your-app-name.onrender.com`
   - Documentation: `https://your-app-name.onrender.com/api-docs`

## 📖 API Documentation

### User Schema

\`\`\`json
{
"firstName": "string (required, 2-50 chars)",
"lastName": "string (required, 2-50 chars)",
"email": "string (required, valid email, unique)",
"age": "number (optional, 0-120)",
"phone": "string (optional, valid phone number)"
}
\`\`\`

### Product Schema

\`\`\`json
{
"name": "string (required, 2-100 chars)",
"description": "string (optional, max 500 chars)",
"price": "number (required, >= 0)",
"category": "string (required, enum values)",
"inStock": "boolean (optional, default: true)",
"quantity": "number (optional, >= 0, default: 0)"
}
\`\`\`

### Product Categories

- Electronics
- Clothing
- Books
- Home & Garden
- Sports
- Toys
- Food
- Other

## 🔍 Example API Usage

### Create a User

\`\`\`bash
curl -X POST http://localhost:3000/api/users \\
-H "Content-Type: application/json" \\
-d '{
"firstName": "John",
"lastName": "Doe",
"email": "john.doe@example.com",
"age": 30,
"phone": "+1-555-123-4567"
}'
\`\`\`

### Create a Product

\`\`\`bash
curl -X POST http://localhost:3000/api/products \\
-H "Content-Type: application/json" \\
-d '{
"name": "iPhone 14 Pro",
"description": "Latest iPhone with Pro camera system",
"price": 999.99,
"category": "Electronics",
"inStock": true,
"quantity": 50
}'
\`\`\`

### Get Users with Pagination

\`\`\`bash
curl "http://localhost:3000/api/users?page=1&limit=10&search=john"
\`\`\`

### Filter Products

\`\`\`bash
curl "http://localhost:3000/api/products?category=Electronics&minPrice=100&maxPrice=1000"
\`\`\`

## 🛡️ Error Handling

The API provides comprehensive error handling with:

- **400 Bad Request**: Validation errors, malformed requests
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

### Error Response Format

\`\`\`json
{
"error": "Error type",
"message": "Detailed error message",
"details": [
{
"field": "fieldName",
"message": "Field-specific error message"
}
]
}
\`\`\`

## 📁 Project Structure

\`\`\`
week-5/
├── models/
│ ├── User.js # User schema and model
│ └── Product.js # Product schema and model
├── routes/
│ ├── users.js # User CRUD endpoints
│ └── products.js # Product CRUD endpoints
├── middleware/
│ └── validation.js # Input validation middleware
├── app.js # Main application file
├── package.json # Dependencies and scripts
├── .env # Environment variables
├── .gitignore # Git ignore rules
└── README.md # This file
\`\`\`

## 🧪 Testing the API

### Using Swagger UI

1. Start the server: `npm run dev`
2. Open `http://localhost:3000/api-docs`
3. Use the interactive interface to test endpoints

### Using Postman

Import the API endpoints using the Swagger JSON:
`http://localhost:3000/api-docs/swagger.json`

## 🤝 Team Collaboration

### Individual Contributions Documentation

Each team member should document their contributions in the following format:

#### Team Member: [Your Name]

**Contribution 1**: [Detailed description of what you implemented]

- Files modified: [List of files]
- Features added: [Specific features]
- Testing performed: [How you tested your changes]

**Contribution 2**: [Detailed description of second contribution]

- Files modified: [List of files]
- Features added: [Specific features]
- Testing performed: [How you tested your changes]

## 📋 Assignment Checklist

- [x] Create two collections (Users and Products)
- [x] Implement full CRUD operations for both collections
- [x] Add comprehensive error handling and validation
- [x] Create Swagger API documentation at `/api-docs`
- [x] Configure for Render deployment
- [x] Add proper project structure and documentation
- [ ] Deploy to Render
- [ ] Document individual team contributions
- [ ] Create 5-8 minute demonstration video
- [ ] Submit GitHub repo, Render site, and YouTube video links

## 🚀 Next Steps

1. **Set up MongoDB Atlas** and update the connection string in `.env`
2. **Test all endpoints** using the Swagger documentation
3. **Deploy to Render** following the deployment guide above
4. **Document your individual contributions**
5. **Create your demonstration video**

## 📞 Support

For questions or issues:

- Check the Swagger documentation at `/api-docs`
- Review error messages in the API responses
- Check the console logs for detailed error information

---

**CS341 Web Services - Week 5 Final Project Part 1**
# byui-w05-final-project
