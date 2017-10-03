const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
});

app.get('/users', (req, res) => {
  res.status(200).send([
    {
      name: 'Person',
      age: 27
    },
    {
      name: 'A',
      age: 100
    },
    {
      name: 'B',
      age: 102
    }
  ]);
});

// app.listen(3000, () =>{
//   console.log('running server at port 3000');
// });

app.listen(3000);

module.exports.app = app;
