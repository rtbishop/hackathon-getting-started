var createError = require('http-errors');
var express = require('express');
var path = require('path');
var https = require('https');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var exphbs  = require('express-handlebars');
//var logger = require('morgan');

var config = require('./conf/config');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var dataRouter = require('./routes/data');
var logoutRouter = require('./routes/logout');

var auth = require('./middleware/auth');

var app = express();

var hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/data', dataRouter);
app.use('/logout', logoutRouter);

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
});

// create http server
app.listen(config.port);

module.exports = app;
