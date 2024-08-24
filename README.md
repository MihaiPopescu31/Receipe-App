# Recipe Application

A  recipe management web application that allows users to add, view, edit, and delete recipes. This application is built with Node.js for the backend and uses vanilla JavaScript for the frontend.

## Features

- **Add Recipes**: Users can add new recipes including name, ingredients, and instructions.
- **View Recipes**: All recipes are displayed in a list format.
- **Edit Recipes**: Users can edit existing recipes.
- **Delete Recipes**: Users can delete recipes from the list.
- **Sort Recipes**: Recipes can be sorted based on their names.
![image](https://github.com/user-attachments/assets/5af9c5d3-e9c7-4f75-9efb-1cbae9805f11)
![image](https://github.com/user-attachments/assets/7189d8bb-a474-42cf-a2c7-55a5ae82d9f2)

## Database Schema

The application uses a PostgreSQL database with the following tables:

### `recipes`

- **id** (integer, primary key, auto-increment) - Unique recipe identifier.
- **created_at** (timestamp) - Recipe creation timestamp.
- **name** (varchar) - Recipe name.
- **instructions** (text) - Preparation instructions.

### `ingredients`

- **id** (integer, primary key, auto-increment) - Unique ingredient identifier.
- **name** (varchar) - Ingredient name.

### `recipe_ingredients`

- **recipe_id** (integer, foreign key) - References `recipes.id`.
- **ingredient_id** (integer, foreign key) - References `ingredients.id`.
- **quantity** (varchar) - Quantity of the ingredient.


## Database Integration

The web application connects to a database to manage and store recipe data. Here’s an overview of how the integration is achieved:

### Database Connection

- **Database Type**: This application uses a [relational database](/NoSQL database) such as MySQL, PostgreSQL, or MongoDB, depending on the specific implementation.

### Backend Setup

- **Server-Side Code**: The application’s backend handles database interactions. This might be implemented using Node.js, Express, Python with Flask or Django, or another server-side technology.
- **Database Configuration**: 
  - **Connection String**: Configured in the backend code or an environment configuration file (e.g., `.env`), specifying the database server address, port, and authentication details.
  - **Example Connection String** (Node.js with MySQL):
    ```javascript
    const mysql = require('mysql');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'recipe_db'
    });
    ```
  
### Data Handling

- **CRUD Operations**:
  - **Create**: Inserting new recipe entries into the database.
  - **Read**: Retrieving recipe data to display on the website.
  - **Update**: Modifying existing recipe entries.
  - **Delete**: Removing recipe entries from the database.

- **APIs**: The backend may expose RESTful APIs or GraphQL endpoints for the frontend to interact with the database. Examples include:
  - `GET /api/recipes`: Retrieve a list of recipes.
  - `POST /api/recipes`: Add a new recipe.
  - `PUT /api/recipes/:id`: Update an existing recipe.
  - `DELETE /api/recipes/:id`: Remove a recipe.

### Security

- **Environment Variables**: Database credentials are stored in environment variables to ensure security and prevent hardcoding sensitive information.
- **Validation and Sanitization**: User input is validated and sanitized to prevent SQL injection attacks and ensure data integrity.

This setup ensures that the application can dynamically interact with the database, providing a seamless and responsive user experience.
## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Database**: PostgreSQL
- **Styling**: Bootstrap (optional)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (for database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MihaiPopescu31/Receipe-App.git
   cd Receipe-App
2. Install dependencies:

- bash
- npm install

3. Set up the database:

- Ensure PostgreSQL is installed and running.
- Create a database and user if you haven't already.
4. Update database configuration:

Open backend/config.js and configure the PostgreSQL connection details.

5. Create the database schema:
Run the provided SQL script or manually create the tables as defined in backend/schema.sql.

6. Run the application:

cd 'c:/Users/mihai/WEB DEVELOPMENT COURSE/Recipe Aplication/backend'
node server.js
or
npm start
The application will be available at http://localhost:3000.

## Usage
- Add a Recipe: Fill out the form with recipe details and submit it.
- View Recipes: Recipes will be listed on the page.
- Edit a Recipe: Click the "Edit" button next to a recipe to modify it.
- Delete a Recipe: Click the "Delete" button next to a recipe to remove it.
