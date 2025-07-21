const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const darkToggle = document.getElementById('dark-mode-toggle');
const container = document.getElementById('container');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks on the page
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
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

// Toggle task completion
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

// When "Add Task" button is clicked
addButton.addEventListener('click', () => {
  const value = taskInput.value.trim();
  if (value === '') {
    errorMsg.classList.remove('hidden');
    return;
  }
  errorMsg.classList.add('hidden');
  addTask(value);
  taskInput.value = '';
});

// Hide error message when typing
taskInput.addEventListener('input', () => {
  if (taskInput.value.trim() !== '') {
    errorMsg.classList.add('hidden');
  }
});

// Allow adding task by pressing Enter key
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

// Toggle dark mode
darkToggle.addEventListener('click', () => {
  container.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', container.classList.contains('dark-mode'));
});

// Load dark mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
  container.classList.add('dark-mode');
}

// Render tasks on initial page load
renderTasks();


