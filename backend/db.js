// Backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipe_manager',
  password: 'Mihai123',
  port: 5432,
});

module.exports = pool;
