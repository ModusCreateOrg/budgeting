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
0. Run `npm install`
1.  Run `npm run build` to build the app
2.  Run `npm run prod` to serve the app on [localhost:3000](http://localhost:3000)
3.  Run a new instance of Chrome with disabled security (because localhost is not on https):

After that, open another terminal (same path) and go to the testing directory.

`$ cd e2e`

```
$ npm install --save wdio-mochawesome-reporter
$ npm install wdio-mocha-framework
$ npm install chromedriver
```
### Now let's setup dependencies
1. Install now the needed for testing `$ npm install`
2. Run `npm run e2e-setup` , this will install drivers for selenium.
3. Move to another terminal (same path) and start selenium standalone server `npm run selenium-server` This will help you to verify the interaction with elements as well. Very useful in debugging.

## Test Execution
`$ npm run test:e2e`
## Test Reporting in HTML
`$ npm run generateWebReport`

# TEST PLAN

### 1. Introduction
1.1 Test Plan Objectives
The purpose of this test plan is to implement the Quality Assurance of Budgeting App.

### 2. Scope
#### 2.1 Types of testing
a) Black-Box
b) Gray box

### 3. Test Strategy
3.1 System Test
3.2 Automated Test
3.3 Documentation Test
3.4 Beta Test
3.5 User Acceptance Test

### 4. Environment Requirements
4.1 OS: MacOS, GNU/Linux, Windows
4.2 Web Browsers:
  4.2.1 Automation: Chrome, Firefox, Safari
  4.2.2 Manual test: Chrome, Firefox, Safari
4.3 WebDriverIO
4.4 Chromedriver
4.5 Mocha
4.6 Node.js
4.7 Selenium-Standalone
4.8 npm

### 5. Test Schedule
Note: This includes all the elements in Test Strategy
Test Design: 4 days
Test Execution: 5 days 
Test Reporting: 1 day

### 6. Control Procedures
6.1 Reviews
6.2 Bug/Defect review meetings
6.3 Change in priorities (if needed)
6.4 Defect Reporting

### 7. Functions to be Tested
7.1 Budget page
  7.1.1 Category and Description, insert, delete and update.
  7.1.1.1 GUI elements (links)
7.2 Reports page
  7.2.1 Inflow vs Outflow
  7.2.2 Spending by Category
  7.3.3 Percentage of elements
  7.4.4 Compare data

#### TEST SCENARIOS
Below is going to be displayed as test scenarios

##### POSITIVE TEST SCENARIOS
1. Verify that user can install webapp
2. Verify that user can build webapp
3. Verify that user can start webapp
4. Verify that when webapp Budget page is displayed
5. Verify in Budget displays Budget button and Reports button
6. Verify that Budget page displays the table with Category, Description and Amount information
7. Verify that below the table displays a dropdown button along with Description text box (Automated)
8. Verify that below the table displays a Value text box (Automated)
8. Verify that if nothing is entered ADD button is disabled (Automated)
9. Verify that total inflow, total outflow and working balance elements are displayed
10. Verify that the numbers are correct in total inflow, total outflow and working balance
11. Verify that user can click from Budget page to Reports button and successfully navigate to "inflow-outflow" web page
12. Verify that Reports displays the information in inflow vs outflow and spending by category
13. Verify that Star and Fork links work

##### NEGATIVE TEST SCENARIOS
1. Verify that Value text box is not allowed to accept special chars
2. Verify that Value text box is not allowed to accept strings
3. Verify that Value text box is not allowed to accept "SQL injection"
4. Verify that user is able to delete all the elements in Budget table
5. Verify that if user deletes all elements in Budget table Reports page does not display bars


### 8. Deliverables 
1. Test Plan
2. Test cases along with Requirements Traceability Matrix
3. Bug/Defect report
4. Test Report and Sign-Off

### 9. Risks
1. Time (if any)
2. Number of resources (if any)
