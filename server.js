var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  description: 'Meet mom for lunch',
  completed: false
}, {
  id: 2,
  description: 'Go to Market',
  completed: false
}, {
  id: 3,
  description: 'Go to Office',
  completed: true
}];

app.get('/', (request, response) => {
  response.send('Todo API Route');
});

//GET all todos
app.get('/todos', (request, response) => {
  response.json(todos);
});

// GET a particular todo/:id
app.get('/todos/:id', (request, response) => {

  var todoid = request.params.id;

  todos.forEach(function(todo) {
    if(todo.id ==  todoid) {
      response.json(todo);
    } else {
      response.status(404).send();
    }
  });
});

app.listen(PORT, () => {
  console.log("Express listening on port " + PORT + " !");
});
