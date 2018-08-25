module.exports = function() {
  this.After(function() {
    // this.driver.sleep(2000);
    return this.driver.quit();
  });
};
