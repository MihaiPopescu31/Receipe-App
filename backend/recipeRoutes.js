const express = require('express');
const router = express.Router();
const recipeController = require('./recipe');

// Endpoint pentru adăugarea unei rețete
router.post('/recipes', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newRecipe = await recipeController.createRecipe(name, ingredients, instructions);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint pentru obținerea tuturor rețetelor
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await recipeController.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint pentru obținerea unei rețete după ID
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipeController.getRecipeById(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint pentru actualizarea unei rețete
router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const updatedRecipe = await recipeController.updateRecipe(id, name, ingredients, instructions);
    if (updatedRecipe) {
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint pentru ștergerea unei rețete
router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await recipeController.deleteRecipe(id);
    if (result) {
      res.status(200).json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
