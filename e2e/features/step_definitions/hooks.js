module.exports = function() {
  this.After(function() {
    return this.driver.quit();
  });
};
