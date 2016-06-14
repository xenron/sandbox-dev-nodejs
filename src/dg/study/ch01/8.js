var express = require('express');

var app = express();

app.use(function (req, res, next) {
  next(new Error('随便抛出个错误'));
});

app.use(function (err, req, res, next) {
  console.log('1: err=%s', err);
  next();
});

app.use(function (req, res, next) {
  res.end('没有捕捉错误');
});

app.use(function (err, req, res, next) {
  console.log('2: err=%s', err);
  next(new Error('新的Error'));
});

app.use(function (err, req, res, next) {
  console.log('3: err=%s', err);
  next(err);
});


app.listen(3001);
