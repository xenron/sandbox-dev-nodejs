var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

var serveStatic = require('./serve_static.js');

app.use('/public', serveStatic({
  root: path.resolve(__dirname, 'public'),
  defaultFile: 'index.html'
}));

app.listen(3001);
