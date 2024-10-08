document.addEventListener('DOMContentLoaded', function() {
    const shoppingListContainer = document.getElementById('shopping-list-container');
    const shoppingList = document.getElementById('shopping-list');
    const newItemInput = document.getElementById('new-item');
    const addItemBtn = document.getElementById('add-item-btn');
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
            shoppingListContainer.style.display = 'block';
            displayShoppingList();
        } else {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginMessage.style.display = 'block';
            shoppingListContainer.style.display = 'none';
        }
    }

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        showMessage('Logged out successfully', 'success');
        updateLoginLink();
    }

    function displayShoppingList() {
        const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            shoppingList.appendChild(li);
        });
    }

    function addItem() {
        const newItem = newItemInput.value.trim();
        if (newItem) {
            const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
            items.push(newItem);
            localStorage.setItem('shoppingList', JSON.stringify(items));
            newItemInput.value = '';
            displayShoppingList();
            showMessage('Item added to shopping list', 'success');
        }
    }

    function removeItem(index) {
        const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.splice(index, 1);
        localStorage.setItem('shoppingList', JSON.stringify(items));
        displayShoppingList();
        showMessage('Item removed from shopping list', 'success');
    }

    addItemBtn.addEventListener('click', addItem);

    shoppingList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeItem(index);
        }
    });

    updateLoginLink();
});
s


    
