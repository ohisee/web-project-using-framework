//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var user = {name: 'Person', age: 25};
var {name} = user; // object destructure
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // {completed: false}
  db.collection('Todos').find().count().then((count) => {
    console.log('Todos');
    console.log(`Todos count: ${count}`);
  }, (error) => {
    console.log('Unable to fetch todos', error);
  });

  db.close();
});
