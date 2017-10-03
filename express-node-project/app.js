var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRoute = require('./routes/index');
var messageRoutes = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/message', messageRoutes);

// catch 404 and forward to error handler
// var err = new Error('Not Found');
// err.status = 404;
// next(err);
app.use(function(req, res, next) {
  return res.render('index', { title: 'Express Page' });
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  return res.status(error.status || 500).json({
    title: 'An error occured',
    error: error
  });
});

module.exports = app;
