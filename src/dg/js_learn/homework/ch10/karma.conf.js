//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            // library
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-scenario/angular-scenario.js',
            //'components/**/*.js',
            //'view*/**/*.js'

            // // basic
            // 'basic/basic.js',
            // 'basic/basic_test.js',
            //
            // // controller
            // 'controller/controller.js',
            // 'controller/controller_test.js',
            //
            // // directive
            // 'directive/basic/template.js',
            // 'directive/basic/template_test.js',
            //
            // // filter
            // 'filter/filter.js',
            // 'filter/filter_test.js',
            //
            // // template1
            // 'backup/template1/tabs.js',
            // 'backup/template1/app.js',
            // 'backup/template1/tabsSpec.js',
            // //'template1/helpers.js',
            // 'backup/template1/tabs.html',
            // 'backup/template1/pane.html',
            //
            // // template2
            // 'backup/template2/tabs.js',
            // 'backup/template2/tabsSpec.js',
            // 'backup/template2/tabs.html',
            //
            // // template3
            // // 'template3/tabs.js',
            // // 'template3/tabsSpec.js',
            // // 'template3/tabs.html',
            'backup/template3/notepad.js',
            'backup/template3/notepad_test.js',
            'backup/template3/template.html',

            // notepad
            // 'notepad/notepad.js',
            // 'notepad/notepad_test.js',
            // 'notepad/tpl/template.html'

            //'jstest/test'
            // templates
            // 'notepad/template.htm'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        // browsers: ['Safari'],
        // browsers: ['Chrome'],
        // browsers: ['Firefox'],
        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        // generate js files from html templates
        preprocessors: {
            // 'template1/*.html': 'ng-html2js',
            // 'template2/*.html': 'ng-html2js',
            // 'template3/*.htm': 'ng-html2js',
            'backup/template3/*.html': 'ng-html2js'
        },

    });
};
