require('./config/config');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos: todos});
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var tid = req.params.id;
  if (!ObjectID.isValid(tid)) {
    res.status(404).send();
  } else {
    Todo.findOne({
      _id: tid,
      _creator: req.user._id
    }).then((todo) => {
      if (todo === null) {
        return res.status(404).send();
      }
      res.status(200).send({todo: todo});
    }).catch((error) => {
      res.status(400).send();
    });
  }
});

app.delete('/todos/:id', authenticate, (req, res) => {
  var tid = req.params.id;
  if (!ObjectID.isValid(tid)) {
    res.status(404).send();
  } else {
    Todo.findOneAndRemove({
      _id: tid,
      _creator: req.user._id
    }).then((todo) => {
      if (todo === null) {
        return res.status(404).send();
      }
      res.status(200).send({todo: todo});
    }).catch((error) => {
      res.status(400).send();
    });
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var tid = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(tid)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = (new Date()).getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate({
    _id: tid,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (todo === null) {
      return res.status(404).send();
    }
    res.send({todo: todo});
  }).catch((error) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((u) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user); // custom header
  }).catch((error) => {
    res.status(400).send(error);
  });
  // if (body.email && body.password) {
  //   var user = new User({
  //     "email": body.email,
  //     "password": body.password
  //   });
  //   user.save().then((doc) => {
  //     res.send(doc);
  //   }, (error) => {
  //     res.status(400).send(error);
  //   });
  // } else {
  //   res.status(400).send();
  // }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCrendentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user); // custom header
    });
  }).catch((error) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log('Started on port', port);
});

module.exports = {
  app: app
};
