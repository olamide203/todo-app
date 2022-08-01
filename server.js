// import express;
const express = require('express');
const logger = require('./middlewares/logger');
const path = require('path')
const todosRouter = require('./routes/todos');
const { dirname } = require('path');

// create an instance of expressapp.use(logger);app.use(logger);
const app = express();
// use the logger function as middleware
app.use(logger);
// serve static files with express
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}))
// use the todos router as a middleware
app.use('/todos', todosRouter);

app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname, './pages/index.html'))
})
// listen to login post request
app.post('/login', (req, res) => {
  console.log(req.body);
  res.send();
});

//ROUTE: /user/:userName
app.get('/user/:userName?', (req, res) => {
  // access request parameter
  let username = req.params.userName || 'John doe';
  console.log(req.params);
  console.log(req.query);
  res.send(
    `welcome ${username} name: ${req.query.name} color: ${req.query.color}`
  );
});

// listen on a port
app.listen(5000, () => {
  console.log('server running on http://localhost:5000');
});
