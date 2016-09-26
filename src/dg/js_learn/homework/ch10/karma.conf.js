//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      // library
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-scenario/angular-scenario.js',
      //'components/**/*.js',
      //'view*/**/*.js'
      
      // basic
      'basic/basic.js',
      'basic/basic_test.js',
      
      // controller
      'controller/controller.js',
      'controller/controller_test.js',
      
      // directive
      'directive/directive.js',
      'directive/directive_test.js',
      
      // filter
      'filter/filter.js',
      'filter/filter_test.js',
      
      // template1
      'template1/tabs.js',
      'template1/app.js',
      'template1/tabsSpec.js',
      //'template1/helpers.js',
      'template1/tabs.html',
      'template1/pane.html',
      
      //'jstest/test'
      // templates
      // 'notepad/template.htm'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    // browsers: ['Safari'],
    // browsers: ['Chrome'],
    browsers: ['Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // generate js files from html templates
    preprocessors: {
      'template1/*.html': 'ng-html2js'
    },

  });
};
