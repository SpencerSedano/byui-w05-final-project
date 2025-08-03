const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
require("dotenv").config();

// Sample users data
const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 30,
    phone: "+1-555-123-4567",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    age: 28,
    phone: "+1-555-987-6543",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    age: 35,
    phone: "+1-555-456-7890",
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    age: 26,
    phone: "+1-555-321-0987",
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    age: 42,
    phone: "+1-555-654-3210",
  },
];

// Sample products data
const sampleProducts = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with Pro camera system and A16 Bionic chip",
    price: 999.99,
    category: "Electronics",
    inStock: true,
    quantity: 50,
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight laptop with M2 chip and all-day battery life",
    price: 1199.99,
    category: "Electronics",
    inStock: true,
    quantity: 30,
  },
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes with air cushioning",
    price: 129.99,
    category: "Sports",
    inStock: true,
    quantity: 75,
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald",
    price: 12.99,
    category: "Books",
    inStock: true,
    quantity: 100,
  },
  {
    name: "Levi's 501 Jeans",
    description: "Classic straight-leg jeans in vintage blue",
    price: 79.99,
    category: "Clothing",
    inStock: true,
    quantity: 60,
  },
  {
    name: "Garden Tool Set",
    description: "Complete 5-piece gardening tool set with carrying case",
    price: 49.99,
    category: "Home & Garden",
    inStock: true,
    quantity: 25,
  },
  {
    name: "LEGO Architecture Set",
    description: "Build famous landmarks with this detailed LEGO set",
    price: 89.99,
    category: "Toys",
    inStock: false,
    quantity: 0,
  },
  {
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans from Colombia",
    price: 24.99,
    category: "Food",
    inStock: true,
    quantity: 40,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} users`);

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    console.log("Database seeded successfully!");

    // Display summary
    console.log("\\n=== SEEDED DATA SUMMARY ===");
    console.log(`Users: ${users.length}`);
    console.log(`Products: ${products.length}`);
    console.log("\\nYou can now test the API endpoints with this sample data.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleUsers, sampleProducts };
