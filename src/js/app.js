document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const filterStatus = document.getElementById("filter-status");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Função para salvar tarefas no localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Função para adicionar ou atualizar tarefa
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskId = document.getElementById("task-id").value;
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;
    const status = document.getElementById("task-status").value;
    const deadline = document.getElementById("task-deadline").value;

    if (taskId) {
      // Editar tarefa existente
      tasks = tasks.map((task) =>
        task.id === taskId
          ? { id: taskId, title, desc, status, deadline }
          : task
      );
    } else {
      // Criar nova tarefa
      tasks.push({ id: Date.now().toString(), title, desc, status, deadline });
    }

    saveTasks();
    renderTasks();
    taskForm.reset();
  });

  // Função para renderizar a lista de tarefas
  function renderTasks() {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter(
      (task) =>
        filterStatus.value === "ALL" || task.status === filterStatus.value
    );

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add(task.status.toLowerCase());
      li.innerHTML = `
                <div class="task-details">
                    <h3>${task.title}</h3>
                    <p>${task.desc}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                    <p><strong>Prazo:</strong> ${task.deadline}</p>
                </div>
                <div class="actions">
                    <button onclick="editTask('${task.id}')">Editar</button>
                    <button onclick="deleteTask('${task.id}')">Excluir</button>
                </div>
            `;
      taskList.appendChild(li);
    });
  }

  // Função para editar uma tarefa
  window.editTask = function (id) {
    const task = tasks.find((task) => task.id === id);
    document.getElementById("task-id").value = task.id;
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.desc;
    document.getElementById("task-status").value = task.status;
    document.getElementById("task-deadline").value = task.deadline;
  };

  // Função para excluir uma tarefa
  window.deleteTask = function (id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  };

  // Filtro de tarefas
  filterStatus.addEventListener("change", renderTasks);

  renderTasks();
});
