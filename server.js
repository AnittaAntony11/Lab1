// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Dish = require('./models/dishModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies from HTTP requests
app.use(bodyParser.json());

// Serve static files (like index.html) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('Connection failed:', err));

/* --------------------
   API Routes
-------------------- */

// GET /api/dishes - Retrieve all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/dishes/:name - Retrieve a single dish by name
app.get('/api/dishes/:name', async (req, res) => {
  try {
    const dish = await Dish.findOne({ name: req.params.name });
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/dishes - Add a new dish
app.post('/api/dishes', async (req, res) => {
  try {
    // Check if the dish already exists
    const existingDish = await Dish.findOne({ name: req.body.name });
    if (existingDish) {
      return res.status(409).json({ error: 'Dish already exists' });
    }
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/dishes/:id - Update an existing dish
app.put('/api/dishes/:id', async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/dishes/:id - Delete a dish
app.delete('/api/dishes/:id', async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
