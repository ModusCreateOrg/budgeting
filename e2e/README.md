# End to End Automation implementation

The Automation tests are built using the next tools

* **WebdriverIO:** Automation framework that allows you to interact with web & mobile apps.
* **Mocha:** Javascript Test Framework.
* **Chai:** Assertion library.

The tests are built using **[Page Object Design Pattern](https://martinfowler.com/bliki/PageObject.html)**.


## Resources needed

Dependencies to Install:

* [NodeJS](https://nodejs.org/en/download/)

* [WebdriverIO](http://webdriver.io/)

## Setup the Test Environment

```
$ git clone <git-repository>
$ cd <project-path>
```
### Prerequisites
Do not forget to
1.  Run `npm run build` to build the app
2.  Run `npm run prod` to serve the app on [localhost:3000](http://localhost:3000)
3.  Run a new instance of Chrome with disabled security (because localhost is not on https):

After that, go to the testing directory.

`$ cd e2e`

```
$ npm install --save wdio-mochawesome-reporter
$ npm install wdio-mocha-framework
$ npm install chromedriver
```
### Now let's setup dependencies
1. Run `npm run e2e-setup` , this will install drivers for selenium.
2. Move to another terminal (same path) and start selenium standalone server `npm run selenium-server` This will help you to verify the interaction with elements as well. Very useful in debugging.

## Test Execution
`$ npm run test:e2e`

# TEST PLAN

