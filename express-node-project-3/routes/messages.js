var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Message.find().populate('user', 'firstName').exec(function(error, messages) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    res.status(200).json({
      message: 'Saved message',
      obj: messages
    });
  }); // fina all messages
});

// Start protecting routes
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secured secret', function(error, decoded) {
    if (error) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: error
      });
    }
    next();
  });
});

// Save
router.post('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(error, user) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    if (user === null) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var message = new Message({
      content: req.body.content,
      user: user
    });
    message.save(function(error, result) {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error: error
        });
      }
      user.messages.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

// Update
router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(error, message) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    if (message === null) {
      return res.status(500).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Not Authenticated user'}
      });
    }
    message.content = req.body.content;
    message.save(function(error, result) {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error: error
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

// delete
router.delete('/:id', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(error, message) {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    if (message === null) {
      return res.status(500).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Not Authenticated user'}
      });
    }
    message.remove(function(error, result) {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error: error
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
