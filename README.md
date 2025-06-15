# Productivity Pro - To-Do List App

A clean, responsive to-do list application that helps you stay organized and boost your productivity. Features task management, filtering, local storage, and a beautiful UI.

## Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All/Active/Completed)
- 📊 Task statistics (remaining/completed)
- 💾 Local storage - tasks persist after page refresh
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 🚀 Keyboard support (press Enter to add tasks)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6)
- Font Awesome Icons
- Google Fonts (Poppins)
- LocalStorage API

## Installation

No installation required! Simply:

1. Download or clone this repository
2. Open `index.html` in your web browser

Alternatively, you can host these files on any web server.

## Usage

1. **Add a task**: Type your task in the input field and click "Add" or press Enter
2. **Complete a task**: Click the checkmark button (✓)
3. **Edit a task**: Click the edit button (✎)
4. **Delete a task**: Click the trash button (🗑)
5. **Filter tasks**: Use the filter buttons at the top (All/Active/Completed)

## Project Structure
productivity-pro/
├── index.html # Main HTML file
├── styles.css # All CSS styles
├── script.js # JavaScript functionality
└── README.md # This documentation

## Customization

You can easily customize the app by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary: #4361ee;
    --secondary: #3f37c9;
    --accent: #f72585;
    --light: #f8f9fa;
    --dark: #212529;
    --gray: #6c757d;
    --success: #4cc9f0;
    --warning: #f8961e;
}
