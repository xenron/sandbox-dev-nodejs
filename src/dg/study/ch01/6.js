var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

function serveStatic (root) {
  return function (req, res, next) {

    var file = req.originalUrl.slice(req.baseUrl.length + 1);  // style.css
    file = path.resolve(root, file);

    var stream = fs.createReadStream(file);
    stream.pipe(res);

  };
}

app.use('/public', serveStatic(__dirname + '/public'));


function getNewsList () {
  var list = [];
  for (var i = 0; i < 10; i++) {
    list.push(getNewsById(i + 1));
  }
  return list;
}

function getNewsById (id) {
  return {
      id: id,
      title: '这里是第' + id + '篇的标题',
      content: '这里是内容'
    };
}

app.get('/', function (req, res, next) {
  res.render('index.ejs', {
    list: getNewsList()
  });
});

app.get('/item/:id', function (req, res, next) {
  res.render('item.ejs', {
    news: getNewsById(req.params.id)
  });
});


app.listen(3001);
