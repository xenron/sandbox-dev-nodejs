var path = require('path');
var fs = require('fs');
var mime = require('mime');
var debug = require('debug')('serveStatic');


// 判断文件名是否在目录下
function isUnderRoot (root, file) {
  var ret = (file.slice(0, root.length) === root || file + path.sep === root);
  debug('`%s` under `%s` = %s', file, root, ret);
  return ret;
}

// 发送文件
function sendFile (req, res, next, file) {
  debug('send file: %s', file);
  var stream = fs.createReadStream(file);
  stream.on('error', function (err) {
    sendError(req, res, next, err);
  });
  res.writeHead(200, {
    'Content-Type': mime.lookup(file)
  });
  stream.pipe(res);
}

// 发送HTTP 403错误
function sendForbid (req, res, next, file) {
  res.statusCode = 403;
  res.end('<h1>Forbidden</h1>');
}

// 发送其他错误
function sendError (req, res, next, err) {
  if (err.code === 'ENOENT') {
    res.statusCode = 404;
    res.end('<h1>Not Found</h1>');
  } else {
    next(err);
  }
}

function serveStatic (options) {

  options = options || {};
  options.root = path.resolve(options.root) + path.sep;
  debug('root=%s, defaultFile=%s', options.root, options.defaultFile);

  return function(req, res, next) {

    // 得到绝对文件路径
    var file = req.originalUrl.slice(req.baseUrl.length + 1);
    file = path.resolve(options.root, file);
    debug('request file: %s', file);

    // 检查文件名是否在预设的根目录下
    if (!isUnderRoot(options.root, file)) {
      return sendForbid(req, res, next, file);
    }

    // 取文件属性
    fs.stat(file, function(err, stat) {
      if (err) return sendError(req, res, next, err);

      if (stat.isDirectory()) {
        // 如果是目录，则检查是否已设置了默认首页文件
        // 若已设置，则发送该首页文件
        // 未设置则直接返回HTTP 403
        if (options.defaultFile) {
          debug('is derectory, send default file');
          return sendFile(req, res, next, path.resolve(file, options.defaultFile));
        } else {
          debug('is derectory, default file not set');
          return sendForbid(req, res, next, file);
        }
      } else {
        return sendFile(req, res, next, file);
      }
    });

  };
}

module.exports = serveStatic;
