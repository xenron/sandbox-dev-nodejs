//jshint strict: false
module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: './app',

        // list of files / patterns to load in the browser
        files: [
            // library
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/angular-resource/angular-resource.js',
            '../bower_components/angular-route/angular-route.js',
            '../bower_components/angular-scenario/angular-scenario.js',
            //'components/**/*.js',
            //'view*/**/*.js'
            // 'app/**/*.js'
            // 'app/**/*.html'
            // 'test/**/*.js'

            // basic
            'basic/basic.js',
            'basic/basic-spec.js',

            // controller
            'controller/pie-controller.js',
            'controller/pie-controller-spec.js',

            // factory
            'factory/desserts-factory.js',
            'factory/desserts-factory-spec.js',

            // filter
            'filter/filter.js',
            'filter/filter-spec.js',

            // directive
            'directive/stateful-directive.js',
            'directive/stateful-directive-spec.js',
            'directive/text-and-sub-directive.html',
            'directive/text-and-sub-directive.js',
            'directive/text-and-sub-directive-spec.js',

            // watcher
            'watcher/watcher.js',
            'watcher/watcher-spec.js',

            // 'directive/template-directive.js',
            // 'directive/template-directive-spec.js',
            //
            // // filter
            // 'filter/filter.js',
            // 'filter/filter_test.js',
            //
            // // template1
            // 'app/backup/template1/tabs.js',
            // 'app/backup/template1/app.js',
            // 'app/backup/template1/tabsSpec.js',
            // //'template1/helpers.js',
            // 'app/backup/template1/tabs.html',
            // 'app/backup/template1/pane.html',
            //
            // // template2
            // 'app/backup/template2/tabs.js',
            // 'app/backup/template2/tabsSpec.js',
            // 'app/backup/template2/tabs.html',
            //
            // // template3
            // // 'template3/tabs.js',
            // // 'template3/tabsSpec.js',
            // // 'template3/tabs.html',
            // 'app/backup/template3/notepad.js',
            // 'app/backup/template3/notepad_test.js',
            // 'app/backup/template3/template.html',

            // notepad
            // 'notepad/notepad.js',
            // 'notepad/notepad_test.js',
            // 'notepad/tpl/template.html'

            //'jstest/test'
            // templates
            // 'notepad/template.htm'
        ],

        // list of files to exclude
        exclude: [

        ],

        autoWatch: true,

        // frameworks to use
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
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        // generate js files from html templates
        preprocessors: {
            // coverage
            'basic/basic.js': ['coverage'],
            'controller/controller.js': ['coverage'],
            'filter/filter.js': ['coverage'],
            'factory/desserts-factory.js': ['coverage'],
            'directive/stateful-directive.js': ['coverage'],
            // '**/*.html': ['ng-html2js'],
            'directive/text-and-sub-directive.html': ['ng-html2js'],
            // 'template1/*.html': 'ng-html2js',
            // 'template2/*.html': 'ng-html2js',
            // 'template3/*.htm': 'ng-html2js',
            // 'template3/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress','coverage'],

        coverageReporter: {
            type : 'html',
            dir : '../coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

    });
};
