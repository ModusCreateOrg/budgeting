let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

function CustomWorld() {

  this.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
}

module.exports = function() {
  this.World = CustomWorld;
  this.setDefaultTimeout(30 * 1000);
};
