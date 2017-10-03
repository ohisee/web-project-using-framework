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

  // delete Many
  db.collection('Todos').deleteMany({text: 'Something to do for false'}).then((result) => {
    console.log(result);
  });

  // delete One
  db.collection('Todos').deleteOne({text: 'Something to do for false 1'}).then((result) => {
    console.log(result);
  });

  // find one and delete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  db.collection('Users').deleteMany({name: 'Person'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5956ecc59386e31415b920df')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  db.close();
});
