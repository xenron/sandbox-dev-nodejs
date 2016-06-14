var http = require('http');
var parseUrl = require('url').parse;
var express = require('express');

var DATA = {
  1: '<h1>这里是第一篇的详细内容</h1>',
  2: '<h1>这里是第二篇的详细内容</h1>',
  3: '<h1>这里是第三篇的详细内容</h1>',
  4: '<h1>这里是第四篇的详细内容</h1>',
  5: '<h1>这里是第五篇的详细内容</h1>'
};

function getNews (id) {
  return DATA[id] || '文章不存在';
}


var app = express();

app.get('/', function (req, res, next) {
  res.send('<ul>' +
             '<li><a href="/item?cat=1&id=1">第一篇</a></li>' +
             '<li><a href="/item?cat=1&id=2">第二篇</a></li>' +
             '<li><a href="/item?cat=1&id=3">第三篇</a></li>' +
             '<li><a href="/item?cat=1&id=4">第四篇</a></li>' +
             '<li><a href="/item?cat=1&id=5">第五篇</a></li>' +
             '</ul><a href="/help">帮助</a>');
});

app.get('/item', function (req, res, next) {
    res.send(getNews(req.query.id));
});

app.get('/help', function (req, res, next) {
  res.send('这里是帮助，来自help.js');
});


var server = http.createServer(function (req, res) {
  app(req, res);
});

server.listen(3001);
