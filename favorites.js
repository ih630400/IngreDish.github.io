document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('favorites-container');
    const messageContainer = document.getElementById('message-container');
    const loginMessage = document.getElementById('login-message');
    const loginLink = document.getElementById('login-link');

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
            loginMessage.style.display = 'none';
            favoritesContainer.style.display = 'grid';
            displayFavorites();
        } else {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginMessage.style.display = 'block';
            favoritesContainer.style.display = 'none';
        }
    }

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        showMessage('Logged out successfully', 'success');
        updateLoginLink();
    }

    function displayFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<div class="no-favorites">You have no favorite recipes yet.</div>';
            return;
        }

        favoritesContainer.innerHTML = '';
        favorites.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            const recipeJson = JSON.stringify(recipe).replace(/'/g, "&#39;");
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.label}">
                <div class="recipe-card-content">
                    <h3>${recipe.label}</h3>
                    <button class="view-recipe" data-recipe='${recipeJson}'>View Recipe</button>
                    <button class="remove-favorite" data-recipe='${recipeJson}'>Remove from Favorites</button>
                    <button class="add-to-shopping-list" data-recipe='${recipeJson}'>Add to Shopping List</button>
                </div>
            `;
            favoritesContainer.appendChild(recipeCard);
        });
    }

    function removeFavorite(recipe) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(fav => fav.label !== recipe.label);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showMessage('Recipe removed from favorites', 'success');
        displayFavorites();
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


    // Use event delegation for button clicks
    favoritesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-recipe')) {
            e.preventDefault(); // Prevent default button behavior
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            viewRecipe(recipe);
        } else if (e.target.classList.contains('remove-favorite')) {
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            removeFavorite(recipe);
        } else if (e.target.classList.contains('add-to-shopping-list')) {
            const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
            addToShoppingList(recipe);
        }
    });

    updateLoginLink();
});

