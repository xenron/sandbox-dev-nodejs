module.exports = function (req, res, next) {
  if (req.pathname === '/help') {
    res.send('这里是帮助，来自help.js');
  } else {
    next();
  }
};
