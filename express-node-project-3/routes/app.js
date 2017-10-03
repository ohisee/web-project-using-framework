var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('index');
});

/*
 * Routes for testing
 */
router.get('/msg/:msg', function(req, res, next) {
	res.render('node', {message: req.params.msg});
});

router.post('/msg', function(req, res, next) {
	var message = req.body.message;
	res.redirect('/msg/' + message);
});

router.get('/email', function(req, res, next) {
	User.findOne({}, function(error, doc) {
		if (error) {
			return res.send('Error');
		}
		res.render('nodess', {email: doc.email});
	})
	//res.render('nodess');
});

router.post('/email', function(req, res, next) {
	var email = req.body.email;
	var user = new User({
		firstName: 'Aaa',
		lastName: 'Bbb',
		password: 'store-password',
		email: email
	});
	user.save();
	res.redirect('/');
});

module.exports = router;
