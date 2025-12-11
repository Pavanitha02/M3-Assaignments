import { displayTodos } from "../modules/displayTodos.js";

// Check login
let loginStatus = localStorage.getItem("loggedIn");
if (!loginStatus) {
  alert("You must login first!");
  window.location.href = "login.html";
}

async function getTodos() {
  let res = await fetch("https://jsonplaceholder.typicode.com/todos");
  let data = await res.json();
  displayTodos(data.slice(0, 20)); // show first 20
}

getTodos();
