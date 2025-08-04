const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CS341 Web Services API",
    version: "1.0.0",
    description: "A RESTful API with two collections: Users and Products",
    contact: {
      name: "CS341 Team",
      email: "team@cs341.com",
    },
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://byui-w05-final-project.onrender.com"
          : `http://localhost:${PORT}`,
      description:
        process.env.NODE_ENV === "production"
          ? "Production server"
          : "Development server",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["firstName", "lastName", "email"],
        properties: {
          _id: {
            type: "string",
            description: "The auto-generated id of the user",
          },
          firstName: {
            type: "string",
            description: "The user's first name",
          },
          lastName: {
            type: "string",
            description: "The user's last name",
          },
          email: {
            type: "string",
            format: "email",
            description: "The user's email address",
          },
          age: {
            type: "number",
            minimum: 0,
            maximum: 120,
            description: "The user's age",
          },
          phone: {
            type: "string",
            description: "The user's phone number",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date the user was created",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date the user was last updated",
          },
        },
      },
      Product: {
        type: "object",
        required: ["name", "price", "category"],
        properties: {
          _id: {
            type: "string",
            description: "The auto-generated id of the product",
          },
          name: {
            type: "string",
            description: "The product name",
          },
          description: {
            type: "string",
            description: "The product description",
          },
          price: {
            type: "number",
            minimum: 0,
            description: "The product price",
          },
          category: {
            type: "string",
            description: "The product category",
          },
          inStock: {
            type: "boolean",
            description: "Whether the product is in stock",
          },
          quantity: {
            type: "number",
            minimum: 0,
            description: "The quantity in stock",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The date the product was created",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "The date the product was last updated",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./app.js"], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Required for Swagger UI in production
  })
);

// CORS configuration for production and development
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://byui-w05-final-project.onrender.com",
          "https://*.onrender.com", // Allow other Render domains
        ]
      : true, // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: Returns a welcome message for the API
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to CS341 Web Services API
 *                 documentation:
 *                   type: string
 *                   example: Visit /api-docs for API documentation
 */
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CS341 Web Services API",
    documentation: "Visit /api-docs for API documentation",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
    },
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    console.log(`Database: ${mongoose.connection.name}`);

    // Listen on all interfaces for Render
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      if (process.env.NODE_ENV === "production") {
        console.log(
          `API documentation available at https://byui-w05-final-project.onrender.com/api-docs`
        );
      } else {
        console.log(
          `API documentation available at http://localhost:${PORT}/api-docs`
        );
      }
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    console.error(
      "Connection string format check:",
      process.env.MONGODB_URI ? "Present" : "Missing"
    );
    process.exit(1);
  });

module.exports = app;
