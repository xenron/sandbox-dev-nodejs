var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemore'
});

connection.connect(function (err) {
  if (err) throw err;

  var field = 'lang';
  var value = 'zh-cn';
  connection.query('SELECT * FROM `link_list` WHERE ??=?', [field, value], function (err, ret) {
    if (err) throw err;

    console.log(ret);
    connection.end();
  });
});
