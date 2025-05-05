module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        jasmine: {
        },
        clearContext: false
      },
      jasmineHtmlReporter: {
        suppressAll: true
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' },
          { type: 'lcov' }
        ],
        check: {
          global: {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0
          }
        }
      },
      reporters: ['progress', 'kjhtml'],
      browsers: ['ChromeHeadlessCI'],
      customLaunchers: {
        ChromeHeadlessCI: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu']
        }
      },
      restartOnFileChange: true,
      failOnEmptyTestSuite: false,
      browserNoActivityTimeout: 60000,
      autoWatch: true,
      singleRun: false
    });
  };