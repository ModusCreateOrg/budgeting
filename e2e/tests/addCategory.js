const expect = require('chai').expect;
const homePage = require('../pages/homePage.js');

describe('Welcome Page', () => {
  it('Verifies Add button exists and is disabled', () => {
    browser.url('/');
    expect(homePage.verifyAddButton()).to.be.false;
  });
});
