const { body, param, validationResult } = require("express-validator");

// User validation rules
const userValidationRules = () => {
  return [
    body("firstName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("First name can only contain letters and spaces"),

    body("lastName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Last name can only contain letters and spaces"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("age")
      .optional()
      .isInt({ min: 0, max: 120 })
      .withMessage("Age must be a number between 0 and 120"),

    body("phone")
      .optional()
      .isMobilePhone()
      .withMessage("Please provide a valid phone number"),
  ];
};

// Product validation rules
const productValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),

    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("category")
      .trim()
      .isIn([
        "Electronics",
        "Clothing",
        "Books",
        "Home & Garden",
        "Sports",
        "Toys",
        "Food",
        "Other",
      ])
      .withMessage(
        "Category must be one of: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other"
      ),

    body("inStock")
      .optional()
      .isBoolean()
      .withMessage("inStock must be a boolean value"),

    body("quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer"),
  ];
};

// ID validation
const idValidationRules = () => {
  return [param("id").isMongoId().withMessage("Invalid ID format")];
};

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

module.exports = {
  userValidationRules,
  productValidationRules,
  idValidationRules,
  validate,
};
