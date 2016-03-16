var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': __dirname + '/basic-sqlitedb.sqlite'
});

var Todo = sequelize.define('todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1,500]
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// sequelize.sync({force: true}).then(function()    is used to drop the table first.
sequelize.sync({force: true}).then(function() {
  console.log('Everything is synced');
  // Putting values in the dabase
  Todo.create({
    description: 'Take out Trash',
  }).then(function(todo) {
    return Todo.create({
      description: "Clean Office"
    })
  }).then(function(todo) {
    //return Todo.findById(1);
    return Todo.findAll({
      where: {
        completed: false,
        description: {
          $like: '%o%'
        }
      }
    });
  }).then(function(todos) {
    if(todos) {
      // console.log(todos);
      todos.forEach(function(todo) {
        console.log(todo.toJSON());
      });
    } else {
      console.log('No todo found');
    }
  }).catch(function(e) {
    console.log(e);
  });
});
