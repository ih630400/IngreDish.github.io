document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            updateNavigation();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    function updateNavigation() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        const loginLink = document.getElementById('login-link');
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            loginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> <span>Logout</span>';
            loginLink.href = '#';
            loginLink.addEventListener('click', logout);
        } else {
            loginLink.innerHTML = '<i class="fas fa-user"></i> <span>Login</span>';
            loginLink.href = 'login.html';
        }
    }

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
});

