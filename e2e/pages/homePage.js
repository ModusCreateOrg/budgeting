const Page = require('../base/page.js');

const homePage = Object.create(Page, {
  //============================================================================
  //========================= APP ELEMENTS =====================================
  //============================================================================
  addButton: {
    get: function() {
      return browser.element("//button[contains(text(), 'Add')]");
    },
  },
  descriptionTextBox: {
    get: function() {
      return browser.element('input[name = description');
    },
  },
  valueTextBox: {
    get: function() {
      return browser.element('input[name = value');
    },
  },

  //============================================================================
  //========================= TEST ACTIONS =====================================
  //============================================================================
  verifyAddButton: {
    value: function() {
      return this.addButton.isEnabled();
    },
  },
  enterDescription: {
    value: function() {
      this.descriptionTextBox.waitForVisible();
      this.descriptionTextBox.click();
    },
  },
  enterValue: {
    value: function() {
      this.valueTextBox.waitForVisible();
      this.valueTextBox.click();
    },
  },
});

module.exports = homePage;
