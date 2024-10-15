IngreDish: A Recipe & Ingredient Management Application

video: https://youtu.be/HNzPv37GM7s

Description:
IngreDish is a web application designed to simplify recipe management, ingredient tracking, and shopping list creation. Whether you're a home chef looking for an organized way to store your recipes or someone who wants to quickly generate shopping lists, this project offers a user-friendly and responsive interface to manage your kitchen needs effectively.

Purpose and Vision
IngreDish was developed to streamline the everyday task of recipe and ingredient management. The main goal was to create a platform where users can store their favorite recipes, quickly add ingredients to a shopping list, and access these lists from any device. The app features user registration and login functionality, ensuring that personalized data (such as favorite recipes and shopping lists) is stored and accessible for each user.

Key Features
Recipe Management: Users can add, edit, and delete their favorite recipes. Each recipe stores details like ingredients, preparation instructions, and can be marked as a "favorite" for quick access.
Shopping List Creation: The app enables users to create custom shopping lists manually or directly from recipe ingredients.
Favorites Section: Easily save your go-to recipes in the favorites section for fast retrieval when needed.
User Authentication: A secure login system allows each user to maintain their own set of data, ensuring that their lists and favorite recipes are preserved across sessions.
Responsive Design: IngreDish is built with mobile responsiveness in mind, allowing users to access the app comfortably from phones, tablets, or desktops.
Project Structure
The project is a static website hosted on GitHub Pages. Its architecture relies on three core technologies: HTML, CSS, and JavaScript. The files are structured as follows:

HTML Files:

index.html: This is the homepage, where users can view and manage their recipes. The homepage acts as the central hub for all features of the app.
shopping-list.html: This page allows users to view and edit their shopping lists. Items can be added directly from recipes or manually entered.
favorites.html: A dedicated section for users to store and manage their favorite recipes for easy access.
login.html: A simple form where users can log in or register to access personalized content.
CSS:

style.css: This file handles the overall appearance and layout of the application. It includes styles for buttons, form elements, and responsive design features that adjust the layout based on screen size.
JavaScript:

script.js: The core functionality of the app is managed through this file. It handles adding and deleting recipes, moving ingredients to the shopping list, and updating user interactions in real time.
register.js: This file handles user registration, ensuring that new users can sign up and their information is stored properly.
login.js: Similar to register.js, this file manages user authentication, ensuring that only registered users can access their stored recipes and shopping lists.
Design Choices
The design choices for this project were driven by a desire for simplicity and usability. Here are a few of the major design considerations and decisions:

Static Site with Local Storage: IngreDish is a static website, meaning it doesn’t require a back-end server or database. Instead, all user data, such as recipes, favorites, and shopping lists, are stored using the browser's local storage. This allows for a simplified deployment and ensures that users can still access their data without needing an active internet connection.

Why this approach? The choice of a static site and local storage was primarily to ensure simplicity in deployment while maintaining basic functionality for users. Since the target users are individuals managing their recipes and grocery lists, local storage provides a low-cost, efficient solution without the need for cloud storage or database integration.

Mobile Responsiveness: Given the nature of the app, which users may want to access while shopping or cooking, mobile accessibility was a top priority. The CSS was written with media queries to ensure that the app looks and functions well on screens of all sizes. This allows users to access their shopping lists or recipes on the go, without needing to open a laptop.

User Authentication with Minimal Overhead: Instead of complex third-party authentication or database management, a simple form-based login and registration system was implemented. While this choice limits some functionality (such as multi-device syncing without the same browser), it provides a lightweight solution that allows users to manage their data within the app.

Separation of Concerns: The JavaScript code is split into different files, each responsible for a specific functionality. script.js handles the core app logic (such as adding recipes and managing shopping lists), while register.js and login.js manage authentication. This modular approach ensures that the app is maintainable and easy to extend in the future.

Future Improvements
While the app currently provides the core functionality needed to manage recipes and shopping lists, several future enhancements are planned:

Cloud Storage & Multi-Device Syncing: Moving user data from local storage to a cloud database would allow for multi-device access, ensuring users can log in from any device and view their saved recipes and shopping lists.
Improved Recipe Search and Categorization: Adding search functionality and recipe categorization (e.g., by cuisine type, dietary restrictions) would make it easier for users to navigate large recipe collections.
Meal Planning Features: Expanding the shopping list functionality to include meal planning, where users can plan their meals for the week and automatically generate a shopping list based on those meals.
Conclusion
IngreDish is a robust, user-friendly web application designed to simplify recipe and ingredient management for users. By focusing on ease of use, responsiveness, and a clean user interface, it aims to provide a simple yet effective tool for managing cooking-related tasks. As the project evolves, it will continue to improve and add features to enhance the user experience even further. 
