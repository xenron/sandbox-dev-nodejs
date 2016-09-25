'use strict';

var app = angular.module('myAppController',[]);

app.filter('length', function() {
  return function(text) {
    return ('' + (text || '')).length;
  }
});

