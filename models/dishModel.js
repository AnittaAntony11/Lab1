const mongoose = require('mongoose');

// Define a Mongoose schema for dishes
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: { type: [String], required: true },
  preparationSteps: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  origin: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Difficult'], required: true } // New field
});

module.exports = mongoose.model('Dish', dishSchema);
