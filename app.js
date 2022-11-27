var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('express-favicon');
var session = require('express-session');
var indexRouter = require('./routes/index');

var app = express();
app.use(session({
  secret: 'ultrasecretkey',
  resave: true,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Routes
app.use('/', indexRouter);

app.all('*', function(req, res) {
  res.redirect("/");
});

module.exports = app;
