// Backend/server.js
const express = require('express');
const app = express();
const port = 3000;
const recipeRoutes = require('./recipeRoutes');

// Middleware pentru JSON
app.use(express.json());

// Servește fișierele statice din directorul public
app.use(express.static('../public'));

// Rute API
app.use('/api', recipeRoutes);

// Pornire server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
