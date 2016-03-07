var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('Todo API Route');
});

app.listen(PORT, () => {
  console.log("Express listening on port " + PORT + " !");
});
