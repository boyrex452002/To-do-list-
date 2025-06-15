// DOM Elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const statsElement = document.getElementById("stats");
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
function init() {
    renderTasks();
    updateStats();
    
    // Add task on Enter key
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        showAlert("Please enter a task");
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    updateStats();
    
    taskInput.value = "";
    taskInput.focus();
}

// Render tasks based on current filter
function renderTasks(filter = 'all') {
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No tasks yet. Add one above!</p>
            </div>
        `;
        return;
    }
    
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-${filter === 'active' ? 'check-circle' : 'list'}"></i>
                <p>No ${filter} tasks found</p>
            </div>
        `;
        return;
    }
    
    taskList.innerHTML = filteredTasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="task-btn complete-btn" onclick="toggleComplete(${task.id})">
                    <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                </button>
                <button class="task-btn edit-btn" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}

// Toggle task completion status
function toggleComplete(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks(getCurrentFilter());
    updateStats();
}

// Edit task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt("Edit your task:", task.text);
    
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks(getCurrentFilter());
    }
}

// Delete task
function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks(getCurrentFilter());
        updateStats();
    }
}

// Filter tasks
function filterTasks(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === filter);
    });
    
    renderTasks(filter);
}

// Get current active filter
function getCurrentFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.textContent.toLowerCase() : 'all';
}

// Update task statistics
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    
    statsElement.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} remaining (${completedTasks} completed)`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show alert message
function showAlert(message) {
    alert(message);
}

// Initialize the app
init();
