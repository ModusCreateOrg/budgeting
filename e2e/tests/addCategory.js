const expect = require('chai').expect;
const homePage = require('../pages/homePage.js');
var config = require('../wdio.conf.js').config;

describe('Welcome Page', () => {
  it('Verifies Add button exists and is disabled', () => {
    // XXX: Below url call is going to be fixed, I had issues with chromedriver.
    // For now working in this way.
    browser.url('/');
    // Below test case expected to fail.
    expect(homePage.verifyAddButton()).to.be.true;
  });

  it('Verifies that description text box is displayed and clickable', () => {
    homePage.enterDescription();
  });

  it('Verifies that value text box is displayed and clickable', () => {
    homePage.enterValue();
  });

});
