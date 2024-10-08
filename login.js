document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');

    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 3000);
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            const user = { username };
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User logged in:', user); // Debug log
            showMessage('Logged in successfully', 'success');
            setTimeout(() => {
                window.location.href = 'favorites.html'; // Redirect to favorites page
            }, 1000);
        } else {
            showMessage('Invalid username or password', 'error');
        }
    });
});
