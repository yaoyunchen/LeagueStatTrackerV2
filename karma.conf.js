module.exports = function (config) {
    'use strict';
    config.set({

        basePath: '',

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-browserify',
            'karma-ejs-preprocessor',
            'karma-chrome-launcher',
            'karma-ng-html2js-preprocessor',
            'karma-ejs-preprocessor'
        ],

        frameworks: ['mocha', 'chai', 'browserify'],

        files: [
            'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js',
            'test/_test-helper.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/ng-dialog/js/ngDialog.js',
            'public/vendor/angular-charts-0.2.6/dist/angular-charts.js',
            'public/javascripts/angularApp.js',
            'public/javascripts/directives/*.js',
            'test/directives/*.js',
            'test/_views/*.ejs'
        ],

        reporters: ['progress'],

        logLevel: config.LOG_INFO,

        browsers: ['Chrome'],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'test/_views/'
        },

        preprocessors: {
            'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js': ['browserify'],
            'test/_test-helper.js': ['browserify'],
            'node_modules/angular-route/angular-route.js': ['browserify'],
            'node_modules/angular-animate/angular-animate.js': ['browserify'],
            'node_modules/ng-dialog/js/ngDialog.js': ['browserify'],
            'public/vendor/angular-charts-0.2.6/dist/angular-charts.js': ['browserify'],
            'public/javascripts/angularApp.js': ['browserify'],
            'public/javascripts/directives/*.js': ['browserify'],
            'test/directives/*.js': ['browserify'],
            'test/_views/*.ejs': ['ng-html2js']
        }
    });
};