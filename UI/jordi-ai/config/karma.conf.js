// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// eslint-disable-next-line no-undef
module.exports = function(config) {
    config.set({
        basePath:                 '',
        frameworks:               ['jasmine', '@angular-devkit/build-angular'],
        plugins:                  [
            // eslint-disable-next-line no-undef
            require('karma-jasmine'),
            // eslint-disable-next-line no-undef
            require('karma-chrome-launcher'),
            // eslint-disable-next-line no-undef
            require('karma-jasmine-html-reporter'),
            // eslint-disable-next-line no-undef
            require('karma-coverage'),
            // eslint-disable-next-line no-undef
            require('karma-spec-reporter'),
            // eslint-disable-next-line no-undef
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        files:                    [
            '../node_modules/zone.js/dist/zone.js'
        ],
        client:                   {
            jasmine:      {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            // eslint-disable-next-line no-undef
            dir:               require('path').join('../reports'),
            subdir:            'coverage',
            reporters:         [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'lcovonly'}
            ],
            includeAllSources: true
        },
        specReporter:             {
            maxLogLines:          5, // limit number of lines logged per test
            suppressSummary:      false, // do not print summary
            suppressErrorSummary: false, // do not print error summary
            suppressFailed:       false, // do not print information about failed tests
            suppressPassed:       true, // do not print information about passed tests
            suppressSkipped:      true, // do not print information about skipped tests
            showBrowser:          false, // print the browser for each spec
            showSpecTiming:       false, // print the time elapsed for each spec
            failFast:             false, // test would finish with error when a first fail occurs
            prefixes:             {
                success: '    OK: ', // override prefix for passed tests, default is '✓ '
                failure: 'FAILED: ', // override prefix for failed tests, default is '✗ '
                skipped: 'SKIPPED: ' // override prefix for skipped tests, default is '- '
            }
        },
        reporters:           ['progress', 'kjhtml', 'spec'],
        port:                9876,
        colors:              true,
        logLevel:            config.LOG_INFO,
        autoWatch:           true,
        browsers:            ['Chrome'],
        singleRun:           false,
        restartOnFileChange: true,
        customLaunchers:     {
            ChromeHeadlessCI: {
                base:  'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        }
    });
};
