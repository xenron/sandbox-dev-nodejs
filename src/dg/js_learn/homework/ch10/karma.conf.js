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
      // app
      'notepad/notepad.js',
      // test
      'notepad/notepad_test.js',
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
    }

  });
};
