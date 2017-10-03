const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var uid = '595ac7f9375b0d0dec08b0d7';
var tid = '595d7057626ecd18d7a653c4';

if (!ObjectID.isValid(tid) || !ObjectID.isValid(uid)) {
  console.log('Id not valid');
}

Todo.find({
  _id: tid
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: tid
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(tid).then((todo) => {
  if (todo === null) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((error) => {
  console.log(error);
});

User.findById(uid).then((user) => {
  if (user === null) {
    return console.log('Unable to find user');
  }
  console.log('User By Id', user);
}).catch((error) => {
  console.log(error);
});
