// ------------------------------
// Fetch Todos From API
// ------------------------------
async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  const first20 = data.slice(0, 20);

  // Store in Local Storage
  localStorage.setItem("todos", JSON.stringify(first20));

  renderTodos();
}


// ------------------------------
// Get Todos From Local Storage
// ------------------------------
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}


// ------------------------------
// Render UI
// ------------------------------
function renderTodos() {
  const todoList = document.getElementById("todoList");
  const todos = getTodos();

  todoList.innerHTML = "";

  // Show message if empty
  const message = document.getElementById("emptyMessage");
  if (todos.length === 0) {
    message.style.display = "block";
    return;
  } else {
    message.style.display = "none";
  }

  todos.forEach(todo => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = todo.title;
    if (todo.completed) title.classList.add("completed");

    // Toggle Button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
    toggleBtn.onclick = () => toggleStatus(todo.id);

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(title);
    li.appendChild(toggleBtn);
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });
}


// ------------------------------
// Delete a Todo
// ------------------------------
function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter(t => t.id !== id);

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}


// ------------------------------
// Toggle Completed Status
// ------------------------------
function toggleStatus(id) {
  let todos = getTodos();

  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}


// ------------------------------
// Button Event
// ------------------------------
document.getElementById("fetchBtn").addEventListener("click", fetchTodos);

// Render immediately on page load
renderTodos();
