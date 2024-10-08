document.addEventListener('DOMContentLoaded', function() {
    const ingredientInput = document.getElementById('ingredient-input');
    const searchBtn = document.getElementById('search-btn');
    const recipeResults = document.getElementById('recipe-results');
    const messageContainer = document.getElementById('message-container');
    const loginLink = document.getElementById('login-link');
    const dietFilter = document.getElementById('diet-filter');
    const healthFilter = document.getElementById('health-filter');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const mealTypeFilter = document.getElementById('meal-type-filter');
    require('dotenv').config()
        console.log(process.env);


    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 3000);
    }

    function updateLoginLink() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.addEventListener('click', logout);
        } else {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
        }
    }

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        showMessage('Logged out successfully', 'success');
        updateLoginLink();
    }

    async function searchRecipes() {
        const ingredients = ingredientInput.value.trim();
        if (ingredients === '') {
            showMessage('Please enter ingredients', 'error');
            return;
        }

        showMessage('Searching for recipes...', 'info');

        const diet = dietFilter.value;
        const health = healthFilter.value;
        const cuisine = cuisineFilter.value;
        const mealType = mealTypeFilter.value;

        let url = `https://api.edamam.com/search?q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        
        if (diet) url += `&diet=${diet}`;
        if (health) url += `&health=${health}`;
        if (cuisine) url += `&cuisineType=${cuisine}`;
        if (mealType) url += `&mealType=${mealType}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.hits.length === 0) {
                showMessage('No recipes found. Try different ingredients or filters!', 'error');
                recipeResults.innerHTML = '';
            } else {
                displayRecipes(data.hits);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            showMessage('An error occurred while fetching recipes. Please try again.', 'error');
        }
    }

    function displayRecipes(recipes) {
        recipeResults.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            const recipeJson = JSON.stringify(recipe.recipe).replace(/'/g, "&#39;");
            recipeCard.innerHTML = `
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <div class="recipe-card-content">
                    <h3>${recipe.recipe.label}</h3>
                    <button class="view-recipe" data-recipe='${recipeJson}'>View Recipe</button>
                    <button class="add-to-favorites" data-recipe='${recipeJson}'>Add to Favorites</button>
                    <button class="add-to-shopping-list" data-recipe='${recipeJson}'>Add to Shopping List</button>
                </div>
            `;
            recipeResults.appendChild(recipeCard);
        });
    }

    function addToFavorites(recipe) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            showMessage('Please login to add recipes to your favorites', 'error');
            return;
        }

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(fav => fav.label === recipe.label);

        if (isAlreadyFavorite) {
            showMessage('This recipe is already in your favorites', 'error');
        } else {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            showMessage('Recipe added to favorites', 'success');
        }
    }

    function addToShoppingList(recipe) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            showMessage('Please login to add items to your shopping list', 'error');
            return;
        }

        const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        recipe.ingredients.forEach(ingredient => {
            if (!shoppingList.includes(ingredient.text)) {
                shoppingList.push(ingredient.text);
            }
        });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        showMessage('Ingredients added to shopping list', 'success');
    }

    function viewRecipe(recipe) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}" style="max-width: 100%;">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `
                    <li>
                        ${ingredient.text}
                        ${ingredient.weight ? ` (${ingredient.weight.toFixed(2)}g)` : ''}
                    </li>
                `).join('')}
            </ul>
            <h3>Nutrition:</h3>
            <ul>
                <li>Calories: ${Math.round(recipe.calories)}</li>
                <li>Protein: ${Math.round(recipe.totalNutrients.PROCNT.quantity)}${recipe.totalNutrients.PROCNT.unit}</li>
                <li>Fat: ${Math.round(recipe.totalNutrients.FAT.quantity)}${recipe.totalNutrients.FAT.unit}</li>
                <li>Carbs: ${Math.round(recipe.totalNutrients.CHOCDF.quantity)}${recipe.totalNutrients.CHOCDF.unit}</li>
            </ul>
            <h3>Diet Labels:</h3>
            <p>${recipe.dietLabels.join(', ') || 'None'}</p>
            <h3>Health Labels:</h3>
            <p>${recipe.healthLabels.join(', ')}</p>
            <h3>Instructions:</h3>
            <p>For full instructions, please visit: <a href="${recipe.url}" target="_blank">Recipe Link</a></p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            document.body.removeChild(modal);
        }
    }
}
    // Add event listener for search button
    searchBtn.addEventListener('click', searchRecipes);

    // Add event listener for Enter key in the input field
    ingredientInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });

    recipeResults.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-recipe')) {
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            viewRecipe(recipe);
        } else if (e.target.classList.contains('add-to-favorites')) {
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            addToFavorites(recipe);
        } else if (e.target.classList.contains('add-to-shopping-list')) {
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            addToShoppingList(recipe);
        }
    });

    updateLoginLink();
});

