var http = require('http');
var parseUrl = require('url').parse;
var connect = require('connect');

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


var app = connect();


app.use(function (req, res, next) {
  res.send = function send (html) {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
    res.end(html);
  };
  next();
});

app.use(function (req, res, next) {
  var info = parseUrl(req.url, true);
  req.pathname = info.pathname;
  req.query = info.query;
  next();
});

app.use(function (req, res, next) {
  if (req.pathname === '/') {
    res.send('<ul>' +
             '<li><a href="/item?cat=1&id=1">第一篇</a></li>' +
             '<li><a href="/item?cat=1&id=2">第二篇</a></li>' +
             '<li><a href="/item?cat=1&id=3">第三篇</a></li>' +
             '<li><a href="/item?cat=1&id=4">第四篇</a></li>' +
             '<li><a href="/item?cat=1&id=5">第五篇</a></li>' +
             '</ul><a href="/help">帮助</a>');
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  if (req.pathname === '/item' && req.query.cat === '1') {
    res.send(getNews(req.query.id));
  } else {
    next();
  }
});

app.use(require('./help'));

app.use(function (req, res, next) {
  res.send('<h1>网页找不到</h1>');
});

var server = http.createServer(function (req, res) {
  app(req, res);
});

server.listen(3001);
