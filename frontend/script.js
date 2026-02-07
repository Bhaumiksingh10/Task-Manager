const API_URL = "http://localhost:5000/api/tasks";

let editTaskId = null;

function loadTasks() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((tasks) => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach((task) => {
        const statusClass = task.status.replace(" ", "-");

        list.innerHTML += `
          <div class="task">
            <div class="task-info">
              <h3>${task.title}</h3>
              <p>${task.description || ""}</p>
              <span class="status ${statusClass}">
                ${task.status}
              </span>
            </div>

            <div class="actions">
              <button class="edit-btn"
                onclick="editTask(
                  '${task._id}',
                  '${task.title}',
                  '${task.description || ""}',
                  '${task.status}'
                )">
                Edit
              </button>

              <button class="delete-btn"
                onclick="deleteTask('${task._id}')">
                Delete
              </button>
            </div>
          </div>
        `;
      });
    });
}

function addOrUpdateTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  if (!title) {
    alert("Title is required");
    return;
  }

  const taskData = { title, description, status };

  if (editTaskId) {
    // UPDATE
    fetch(`${API_URL}/${editTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }).then(resetForm);
  } else {
    // CREATE
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }).then(resetForm);
  }
}

function editTask(id, title, description, status) {
  editTaskId = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("status").value = status;
  document.getElementById("submitBtn").innerText = "Update Task";
}

function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(() => loadTasks());
}

function resetForm() {
  editTaskId = null;
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("status").value = "Pending";
  document.getElementById("submitBtn").innerText = "Add Task";
  loadTasks();
}

loadTasks();
