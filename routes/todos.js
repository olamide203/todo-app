const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data.json");

// create todod router
const router = express.Router();

// route specific middle ware
router.use(async (req, res, next) => {
  let todos;
  try {
    const data = await fs.readFile(filePath);
    todos = JSON.parse(data);
  } catch (error) {
    todos = [];
  }
  req.todos = todos;

  next();
});
// ROUTE: GET /todos
// DESCRIPTION: create a new todo

router.post("/", async (req, res) => {
  console.log(req.body);

  let id = req.todos.length + 1;
  //   create todo item from req body
  let newTodo = {
    id,
    title: req.body.title,
    todo: req.body.todo,
    completed: false,
  };
  //   update the todos array
  req.todos.push(newTodo);
  //   save the todos array into the data.json file
  await fs.writeFile(filePath, JSON.stringify(req.todos));
  res.status(200).redirect("back");
});

// ROUTE: GET /todos
// DESCRIPTION: get all the todos from database
router.get("/", async (req, res) => {
  // get all todos from database

  let response = { success: true, data: req.todos };
  res.status(200).json(response);
});

// Route: put /todos/:todo_id
// Description: update the completed field on a todo object
router.put("/:todo_id", async (req, res) => {
  let id = parseInt(req.params.todo_id);
  req.todos = req.todos.reduce((acc, curr) => {
    console.log(curr.id, id);
    if (curr.id === id) {
      curr.completed = true;
    }
    acc.push(curr);
    return acc;
  }, []);
  await fs.writeFile(filePath, JSON.stringify(req.todos));
  res.status(201).json({ success: true, data: [] });
});

router.delete("/:todo_id", async (req, res) => {
  let delId = parseInt(req.params.todo_id);
  req.todos = req.todos.filter((todo) => todo.id != delId);
  fs.writeFile(filePath, JSON.stringify(req.todos));
  res.status(201).json({ success: true, data: "" });
});
module.exports = router;
