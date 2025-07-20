const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const darkToggle = document.getElementById('dark-mode-toggle');
const container = document.getElementById('container');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
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

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  tasks.push(newTask);
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

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

taskInput.addEventListener('input', () => {
  if (taskInput.value.trim() !== '') {
    errorMsg.classList.add('hidden');
  }
});

darkToggle.addEventListener('click', () => {
  container.classList.toggle('dark-mode');
});
