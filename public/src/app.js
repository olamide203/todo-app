async function fetchTodos() {
  let response = await fetch('http://localhost:5000/todos');
  response = await response.json();
  let data = response.data;
  console.log(data);
  let todos = document.querySelector('.todos');
  data.forEach((item) => {
    let string = `<li>${item.todo}</li>`;
    todos.innerHTML += string;
  });
}

fetchTodos();
