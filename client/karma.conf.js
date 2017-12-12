// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    var configuration={
        basePath: '',
        files: ['./google-maps-api.js'],
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma'),
            require('karma-mocha-reporter'),
            require('karma-spec-reporter')
        ],
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        // reporters configuration
        reporters: ['mocha', 'spec'],
        mochaReporter: {
            output: 'full'
        },
        terminal: true,
        port: 9876,
        colors: false,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
    };
    config.set(configuration);
};