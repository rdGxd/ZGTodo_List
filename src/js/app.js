let tasks = [];
let editingTaskIndex = null;

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const status = document.getElementById('status').value;

  if (editingTaskIndex === null) {
    const task = { title, description, status };
    tasks.push(task);
  } else {
    tasks[editingTaskIndex] = { title, description, status };
    editingTaskIndex = null;
    document.getElementById('save-button').innerText = "Salvar Tarefa";
  }

  document.getElementById('form').reset();
  renderTasks();
});

function renderTasks() {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
            <span><strong>${task.title}</strong> - ${task.description} (${task.status})</span>
            <div class="task-actions">
                <button class="edit" onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Excluir</button>
            </div>
        `;
    tasksList.appendChild(taskItem);
  });
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('status').value = task.status;
  editingTaskIndex = index;
  document.getElementById('save-button').innerText = "Atualizar Tarefa";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
