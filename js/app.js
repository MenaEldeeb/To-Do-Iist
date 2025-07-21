const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const darkToggle = document.getElementById('dark-mode-toggle');
const container = document.getElementById('container');

let tasks = [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Render tasks on the screen
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = "complete";
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => toggleTask(task.id);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => removeTask(task.id);

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  });
}

// Add a new task
function addTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Toggle task status (completed / not completed)
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Remove a task
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Handle add button click
addButton.addEventListener('click', () => {
  const value = taskInput.value.trim();
  if (value === '') {
    errorMsg.classList.remove('hidden');
    errorMsg.style.display = 'block';
    return;
  }
  errorMsg.classList.add('hidden');
  errorMsg.style.display = 'none';
  addTask(value);
  taskInput.value = '';
});

// Hide error message when user starts typing
taskInput.addEventListener('input', () => {
  if (taskInput.value.trim() !== '') {
    errorMsg.classList.add('hidden');
    errorMsg.style.display = 'none';
  }
});

// Toggle dark mode and save its state
darkToggle.addEventListener('click', () => {
  container.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', container.classList.contains('dark-mode'));
});

// Load dark mode setting on page load
function loadTheme() {
  if (localStorage.getItem('darkMode') === 'true') {
    container.classList.add('dark-mode');
  }
}

// Load data when the page is loaded
window.onload = () => {
  loadTheme();
  loadTasks();
};
