let todos = document.querySelector(".intro__todos");

async function fetchTodos() {
  let response = await fetch("http://localhost:5000/todos");
  response = await response.json();
  let data = response.data;
  data.forEach((item) => {
    let todo = `
     <div class="intro__todos">
    <div class="todo">
      <h4 class="todo__title">${item.title}</h4>
      <p class="todo__content">${item.todo}</p>
      <button class="todo__button todo__delete" id="${item.id}">DELETE</button>
      <button class="todo__button todo__edit" id="${item.id}">COMPLETE</button>
    </div>`;
    todos.innerHTML += todo;
  });
}

fetchTodos();

todos.addEventListener("click", (event) => {
  var elem = event.target;
  if (elem.classList.contains("todo__edit")) {
    fetch(`/todos/${elem.id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  if (elem.classList.contains("todo__delete")) {
    var id = elem.id;
    fetch(`/todos/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        elem.parentNode.parentNode.remove();
      });
  }
});
