document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');

    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 3000);
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        // In a real application, you would send this data to a server for registration
        // For this example, we'll just store the user in localStorage
        const user = { username, email };
        localStorage.setItem('user', JSON.stringify(user));
        showMessage('Registered successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
});
