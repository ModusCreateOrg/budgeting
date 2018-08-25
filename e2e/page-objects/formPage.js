const { By } = require("selenium-webdriver");

module.exports = {
  elements: {
    categoriesSelect: function(value) {
      return By.xpath('//option[contains(.,"' + value + '")]');
    },
    description: By.name("description"),
    value: By.name("value"),
    addBtn: By.xpath('//button[@type="submit" and contains(.,"Add")]'),
    reportsLink: By.xpath('//a[contains(.,"Reports")]'),
    addedCategory: By.xpath('(//table[@class="containers-BudgetGrid-style-budgetGrid"]//tbody//tr)[last()]/td[1]/div[@class="components-BudgetGridRow-style-cellContent"]'),
    addedDescription: By.xpath('(//table[@class="containers-BudgetGrid-style-budgetGrid"]//tbody//tr)[last()]/td[2]/div[@class="components-BudgetGridRow-style-cellContent"]'),
    addedValue: By.xpath('(//table[@class="containers-BudgetGrid-style-budgetGrid"]//tbody//tr)[last()]/td[3]/div[@class="components-BudgetGridRow-style-cellContent"]'),
    totalBalance: By.xpath('//div[@class="components-Balance-style-balanceItem" and contains(.,"Working Balance")]/div[contains(@class,"components-Balance-style-balanceAmount")]')
  }
};
