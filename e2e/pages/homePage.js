const Page = require('../base/page.js');

const homePage = Object.create(Page, {
  //= ===========================================================================
  //= ======================== APP ELEMENTS =====================================
  //= ===========================================================================
  categoryIdDropDown: {
    get: function() {
      return browser.element("categoryId");
    },
  },

  //= ===========================================================================
  //= ======================== TEST ACTIONS =====================================
  //= ===========================================================================
  clickCategoryIdDropDown: {
    value: function() {
      this.categoryIdDropDown.waitForVisible();
      this.categoryIdDropDown.click();
    },
  },
});

module.exports = homePage;
