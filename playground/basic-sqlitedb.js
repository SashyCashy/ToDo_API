var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect': 'sqlite',
  'storage': 'basic-sqlitedb.sqlite'
});

sequelize.sync().then(function() {
  console.log('Everything is synced');
});
