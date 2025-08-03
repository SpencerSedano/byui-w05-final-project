<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# CS341 Web Services API - Copilot Instructions

This is a Node.js Express API project for CS341 Web Services course with the following specifications:

## Project Overview

- **Framework**: Express.js with Node.js
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Swagger/OpenAPI 3.0
- **Deployment**: Render.com
- **Collections**: Users and Products with full CRUD operations

## Code Style Guidelines

- Use ES6+ features and async/await for asynchronous operations
- Follow RESTful API conventions for endpoint naming
- Include comprehensive error handling with proper HTTP status codes
- Use express-validator for input validation
- Include detailed Swagger documentation for all endpoints
- Follow MongoDB/Mongoose best practices

## Key Features to Maintain

- Full CRUD operations for Users and Products
- Input validation and sanitization
- Comprehensive error handling
- Swagger documentation at `/api-docs`
- Pagination and filtering capabilities
- Security middleware (helmet, cors)
- Request logging with Morgan

## Database Schemas

- **Users**: firstName, lastName, email (unique), age, phone
- **Products**: name, description, price, category (enum), inStock, quantity

## Error Handling Standards

- Return consistent error format with error type, message, and details
- Use appropriate HTTP status codes (400, 404, 500)
- Include field-specific validation errors when applicable

## Documentation Requirements

- All endpoints must have Swagger documentation
- Include request/response examples
- Document all query parameters and request bodies
- Use proper OpenAPI 3.0 schema definitions
