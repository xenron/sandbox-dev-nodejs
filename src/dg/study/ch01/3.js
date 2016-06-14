var http = require('http');
var parseUrl = require('url').parse;

var DATA = {
  1: '<h1>这里是第一篇的详细内容</h1>',
  2: '<h1>这里是第二篇的详细内容</h1>',
  3: '<h1>这里是第三篇的详细内容</h1>'
};

function getNews (id) {
  return DATA[id] || '文章不存在';
}

var server = http.createServer(function (req, res) {

  function send (html) {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
    res.end(html);
  }

  var info = parseUrl(req.url, true);
  console.log(info);

  if (info.pathname === '/') {

    // 显示新闻列表
    send('<ul>' +
           '<li><a href="/item?cat=1&id=1">第一篇</a></li>' +
           '<li><a href="/item?cat=1&id=2">第二篇</a></li>' +
           '<li><a href="/item?cat=1&id=3">第三篇</a></li>' +
           '</ul>');

  } else if (info.pathname === '/item' && info.query.cat === '1') {

    send(getNews(req.query.id));

  } else {

    send('<h1>网页找不到</h1>');

  }

});

server.listen(3001);
