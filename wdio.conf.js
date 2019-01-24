exports.config = {

    /* server configurations */
    host: '0.0.0.0',
    port: 4444,
    path: '/wd/hub',
    /* specify test files */
    specs: [
        './e2e/tests/addCategory.js'
    ],
    exclude: [
        // Here are going to be the exclusions
    ],
    maxInstances: 1,
    /* capabilities */
     capabilities: [{
       browserName: 'chrome'
     }],
    /* test configurations */
    logLevel: 'error',
    sync: true,
    coloredLogs: true,
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './tests/screenshots',
    baseUrl: 'http://localhost:8000',
    waitforTimeout: 8000,
    framework: 'mocha',
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Deprectation warnings
    // if set to true deprecation warnings will be shown in the console
    deprecationWarnings: false,
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // ===================
    // Services
    // ===================
    services: ['selenium-standalone'],
    //Selenium options
    seleniumLogs: './logs',

    reporters: ['spec', 'mochawesome'],
    reporterOptions: {
        outputDir: './mochawesome-report/Reports',
        screenshotUseRelativePath:false,
        mochawesome_filename: 'e2e-TestExecutionReport.json'
    },

    mochawesomeOpts: {
        ui: 'bdd',
        includeScreenshots:true,
        screenshotUseRelativePath:false
    },
//     mochaOpts: {
//        ui: 'bdd',
//        timeout: 999999
//    },
    /* hooks */

    onPrepare: function() {
        console.log('Will run end2end tests');
    },
    onComplete: function() {
        console.log('Done!');
    }
};
