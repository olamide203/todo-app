const express = require('express');
const fs = require('fs/promises');
const path = require('path');

// create todod router
const router = express.Router();

// ROUTE: GET /todos
// DESCRIPTION: create a new todo

router.post('/', async (req, res) => {
  console.log(req.body);
  //   path to data.js file
  const filePath = path.join(__dirname, '../data.json');
  let todos;
  try {
    const data = await fs.readFile(filePath);
    todos = JSON.parse(data);
  } catch (error) {
    todos = [];
  }
  let id = todos.length + 1;
  //   create todo item from req body
  let newTodo = { id, title: req.body.title, todo: req.body.todo };
  //   update the todos array
  todos.push(newTodo);
  //   save the todos array into the data.json file
  await fs.writeFile(filePath, JSON.stringify(todos));
  res.status(200).redirect('back');
});

// ROUTE: GET /todos
// DESCRIPTION: get all the todos from database
router.get('/', async (req, res) => {
  // get all todos from database
  let filePath = path.join(__dirname, '../data.json');
  // convert todos from buffer to array
  let todos;
  try {
    data = await fs.readFile(filePath);
    todos = JSON.parse(data);
  } catch (error) {
    todos = [];
  }
  let response = { success: true, data: todos };
  res.status(200).json(response);
});
module.exports = router;
