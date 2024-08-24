const pool = require('./db');

// Crearea unei noi rețete
const createRecipe = async (name, ingredients, instructions) => {
  const result = await pool.query(
    'INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
    [name, ingredients, instructions]
  );
  return result.rows[0];
};

// Obținerea tuturor rețetelor
const getAllRecipes = async () => {
  const result = await pool.query('SELECT * FROM recipes');
  return result.rows;
};

// Obținerea unei rețete după ID
const getRecipeById = async (id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
};

// Actualizarea unei rețete
const updateRecipe = async (id, name, ingredients, instructions) => {
  const result = await pool.query(
    'UPDATE recipes SET name = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
    [name, ingredients, instructions, id]
  );
  return result.rows[0];
};

// Ștergerea unei rețete
const deleteRecipe = async (id) => {
  const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
  return result.rowCount > 0;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
