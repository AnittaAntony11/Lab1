
const mongoose = require('mongoose');

// Define a Mongoose schema for dishes
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: { type: [String], required: true },
  preparationSteps: { type: String, required: true },
  cookingTime: { type: Number, required: true }, // in minutes
  origin: { type: String, required: true },
  spiceLevel: { type: String } // Custom field (e.g., mild, medium, hot)
});

// Create and export the Dish model using the schema
module.exports = mongoose.model('Dish', dishSchema);
