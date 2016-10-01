//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            // library
            '../bower_components/jquery/dist/jquery.js',
            '../bower_components/angular/angular.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            '../bower_components/angular-route/angular-route.js',
            '../bower_components/angular-scenario/angular-scenario.js',
            //'components/**/*.js',
            //'view*/**/*.js'

            // basic
            'basic/basic.js',
            'basic/basic_test.js',

            // controller
            'controller/pie-controller.js',
            'controller/pie-controller-spec.js',
            //
            // // directive
            // 'app/directive/basic/template.js',
            // 'app/directive/basic/template_test.js',
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
            'template1/*.html': 'ng-html2js',
            'template2/*.html': 'ng-html2js',
            'template3/*.htm': 'ng-html2js',
            'template3/*.html': 'ng-html2js'
        },

        reporters: ['progress','coverage'],
        // preprocessors : {'*.js': 'coverage'},
        coverageReporter: {
            type : 'html',
            dir : '../coverage/'
        }

    });
};
