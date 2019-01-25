const expect = require('chai').expect;
const homePage = require('../pages/homePage.js');

describe('Welcome Page', () => {
  it('Verifies Add button exists and is disabled', () => {
    // XXX: Below url call is going to be fixed, I had issues with chromedriver.
    // For now working in this way.
    browser.url('/');
    expect(homePage.verifyAddButton()).to.be.false;
  });

  it('Verifies that description text box is displayed and clickable', function() {
    homePage.enterDescription();
  });

  it('Verifies that value text box is displayed and clickable', function() {
    homePage.enterValue();
  });
});
