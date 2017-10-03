const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: '595d98055dcd6c32611d28f3'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('595d98055dcd6c32611d28f2').then((todo) => {
  console.log(todo);
});
