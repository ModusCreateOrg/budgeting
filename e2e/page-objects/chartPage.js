const { By } = require("selenium-webdriver");

module.exports = {
  elements: {
    categoryName: function(value) {
      return By.xpath('//span[contains(.,"' + value + '")]');
    },
    categoryBalance: function(value) {
      return By.xpath('//li[contains(.,"' + value + '")]/span[@class="components-Legend-styles-value"]');
    },
  }
};
