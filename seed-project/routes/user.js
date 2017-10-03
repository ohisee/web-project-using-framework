var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// Path /user
router.post('/', function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10) // one way encryption
  });
  user.save(function(error, result) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    // resource created 201
    res.status(201).json({
      message: 'Created user',
      obj: result
    });
  });
});

// Path /user/signin
router.post('/signin', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(error, user) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    if (user === null) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'You Provided Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign({user: user}, 'secured secret', { expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
