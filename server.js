var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

/*
{
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
}*/

app.get('/', (request, response) => {
  response.send('Todo API Route');
});

//GET all todos
app.get('/todos', (request, response) => {
  response.json(todos);
});

// GET a particular todo/:id
app.get('/todos/:id', (request, response) => {

  var todoid = parseInt(request.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoid});
  // todos.forEach(function(todo) {
  //   if(todo.id === todoid) {
  //     matchedTodo = todo
  //   }
  // });

  if(matchedTodo) {
    response.json(matchedTodo);
  } else {
    response.status(404).send();
  }
});

// POST / todos
app.post('/todos', (request, response) => { // Install body parser
  var body = request.body;
  console.log("Description: " + body.description);
  var newTodo = {
    id: todoNextId,
    description: body.description,
    completed: body.completed
  };
  todoNextId++;
  todos.push(newTodo);

  response.json(body);
})



app.listen(PORT, () => {
  console.log("Express listening on port " + PORT + " !");
});
