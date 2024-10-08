document.addEventListener('DOMContentLoaded', function() {
    const settingsContainer = document.getElementById('settings-container');
    const settingsForm = document.getElementById('settings-form');
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
            settingsContainer.style.display = 'block';
        } else {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginMessage.style.display = 'block';
            settingsContainer.style.display = 'none';
        }
    }

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        showMessage('Logged out successfully', 'success');
        updateLoginLink();
    }

    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        user.username = newUsername;
        user.password = newPassword; // In a real app, you'd hash this password
        localStorage.setItem('user', JSON.stringify(user));

        showMessage('Settings updated successfully', 'success');
        settingsForm.reset();
    });

    updateLoginLink();
});


