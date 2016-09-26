'use strict';

var app = angular.module('myAppFilter',[]);

app.filter('length', function() {
  return function(text) {
    return ('' + (text || '')).length;
  }
});

