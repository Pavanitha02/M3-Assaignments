export function displayTodos(data) {
  let container = document.getElementById("todo-container");
  container.innerHTML = "";

  data.forEach(todo => {
    let div = document.createElement("div");
    div.style = "padding:10px; border:1px solid #aaa; margin:8px;";

    div.innerHTML = `
      <h4>${todo.title}</h4>
      <p>Status: ${todo.completed ? "Completed" : "Pending"}</p>
    `;

    container.append(div);
  });
}
