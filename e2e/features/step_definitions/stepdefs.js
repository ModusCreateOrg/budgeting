let assert = require('assert');
let formPage = require('../../page-objects/formPage');
let chartPage = require('../../page-objects/chartPage');

module.exports = function () {

  this.Given(/^I am on "([^"]*)"$/, function (arg1) {
    return this.driver.get(arg1);
  });

  this.Then(/^I should see "([^"]*)"$/, function (arg1) {
    assert.equal(formPage.url, arg1);
    return formPage.url;
  });

  this.Then(/^I should see "([^"]*)" in "([^"]*)"$/, function (text, element) {
    return this.driver.findElement(formPage.elements[element]).getText().then(function (value) {
      assert.equal(text, value);
    });
  });

  this.When(/^I click on "([^"]*)"$/, function (element) {
    return this.driver.findElement(formPage.elements[element]).click()
  });

  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/, function (field, value) {
    return this.driver.findElement(formPage.elements[field]).sendKeys(value);
  });

  this.When(/^I select category "([^"]*)" in "([^"]*)"$/, function (option, select) {
    return this.driver.findElement(formPage.elements[select](option)).click();
  });

  this.Then(/^Category "([^"]*)" should be only "([^"]*)" and balance is "([^"]*)"$/, function (category, count, balance) {
    this.driver.findElements(chartPage.elements.categoryName(category)).then(function (value) {
      assert.equal(count, value.length);
    });
    return this.driver.findElement(chartPage.elements.categoryBalance(category)).getText().then(function (value) {
      assert.equal(balance, value);
    });
  });


};

