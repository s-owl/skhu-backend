const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅
// 라우팅 나머지는 routes/index.js 에서 작업합니다.
app.use('/', routes);


// 404 오류 처리
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("REQ PATH : " + req.baseUrl);
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// 그 외 오류 처리

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("ERROR!\n" + err.message + "\n" + err.stack + "\n Requested Path : " + req.baseUrl);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("ERROR!\n" + err.message);
});

module.exports = app;
