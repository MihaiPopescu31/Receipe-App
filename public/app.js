document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipe-form');
  const recipeList = document.getElementById('recipe-list');
  let editingRecipeId = null;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    if (editingRecipeId) {
      try {
        const response = await fetch(`/api/recipes/${editingRecipeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, ingredients, instructions }),
        });

        if (response.ok) {
          const updatedRecipe = await response.json();
          updateRecipeInList(updatedRecipe);
          form.reset();
          editingRecipeId = null;
        } else {
          console.error('Failed to update recipe');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, ingredients, instructions }),
        });

        if (response.ok) {
          const recipe = await response.json();
          addRecipeToList(recipe);
          form.reset();
        } else {
          console.error('Failed to add recipe');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  async function fetchRecipes() {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const recipes = await response.json();
        recipes.forEach(addRecipeToList);
      } else {
        console.error('Failed to load recipes');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function addRecipeToList(recipe) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'list-group-item-success'); // Use Bootstrap classes for styling
    li.innerHTML = `
      <h5>${recipe.name}</h5>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button class="btn btn-warning btn-sm" onclick="editRecipe(${recipe.id})">Edit</button>
      <button class="btn btn-danger btn-sm ml-2" onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;
    recipeList.appendChild(li);
  }

  function updateRecipeInList(recipe) {
    const items = recipeList.getElementsByTagName('li');
    for (let item of items) {
      if (item.innerHTML.includes(`onclick="editRecipe(${recipe.id})"`)) {
        item.innerHTML = `
          <h5>${recipe.name}</h5>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <button class="btn btn-warning btn-sm" onclick="editRecipe(${recipe.id})">Edit</button>
          <button class="btn btn-danger btn-sm ml-2" onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        break;
      }
    }
  }

  window.deleteRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const items = recipeList.getElementsByTagName('li');
        for (let item of items) {
          if (item.innerHTML.includes(`onclick="deleteRecipe(${id})"`)) {
            recipeList.removeChild(item);
            break;
          }
        }
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  window.editRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      if (response.ok) {
        const recipe = await response.json();
        document.getElementById('name').value = recipe.name;
        document.getElementById('ingredients').value = recipe.ingredients;
        document.getElementById('instructions').value = recipe.instructions;
        editingRecipeId = id;
      } else {
        console.error('Failed to fetch recipe for editing');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchRecipes();
});
