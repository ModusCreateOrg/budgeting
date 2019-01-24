var Page = require('../base/page.js');
  
var homePage = Object.create(Page, {
  //============================================================================
  //========================= APP ELEMENTS =====================================
  //============================================================================
  categoryIdDropDown: {
    get: function() {
      return browser.element('~categoryId');
    }
  },

  //============================================================================
  //========================= TEST ACTIONS =====================================
  //============================================================================
  clickCategoryIdDropDown: {
    value: function() {
      this.categoryIdDropDown.waitForVisible();
      this.categoryIdDropDown.click();
    }
  }
});

module.exports = homePage;
