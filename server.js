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

  if(matchedTodo) {
    response.json(matchedTodo);
  } else {
    response.status(404).send();
  }
});

// POST / todos
app.post('/todos', (request, response) => { // Install body parser
  var body = _.pick(request.body, 'description', 'completed')//request.body;
  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    return response.status(404).send();
  }

  console.log("Description: " + body.description);
  var newTodo = {
    id: todoNextId,
    description: body.description.trim(),
    completed: body.completed
  };
  todoNextId++;
  todos.push(newTodo);

  response.json(body);
})


// DELETE/todo:id
app.delete('/todos/:id', (request, response) => {
  var todoid = parseInt(request.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoid});
  if(matchedTodo) {
    var newTodos = _.without(todos, matchedTodo);
    todos = newTodos;
    response.json(todos);
  } else {
    return response.status(404).json({"error": "Todo not found for the provided id."});
  }
});


// update
app.put('/todos/:id', (request, response) => {
  var todoid = parseInt(request.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoid});
  var body = _.pick(request.body, "description", "body");
  var validAttributes = {};

  if(!matchedTodo) {
    return response.status(404).json({"error": "Todo not found for the provided id."});
  }

  if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttributes.completed = body.completed;
  } else if(body.hasOwnProperty('completed')) {
    return response.status(404).send();
  }

  if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.length > 0) {
    validAttributes.description = body.description;
  } else if(body.hasOwnProperty('description')) {
    return response.status(404).send();
  }

  matchedTodo = _.extend(matchedTodo, validAttributes);
  response.json(matchedTodo);
});



app.listen(PORT, () => {
  console.log("Express listening on port " + PORT + " !");
});
