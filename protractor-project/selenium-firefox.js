var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
  .usingServer('http://localhost:4444/wd/hub')
  .forBrowser('firefox').build();

driver.get('http://localhost:3000');
driver.findElement(By.css('input[_ngcontent-c1]')).sendKeys(' enter');
driver.sleep(1000);
driver.findElement(By.css('input[_ngcontent-c1]')).sendKeys(' see');
driver.sleep(1000);
driver.findElement(By.css('input[_ngcontent-c1]')).sendKeys(' something');
driver.wait(until.elementTextIs(
  driver.findElement(By.css('h2[_ngcontent-c1]')),
  'Hello Title angular testing enter see something'),
  3000);
driver.findElement(By.id('abutton')).click();
driver.sleep(2000);
driver.findElement(By.css('[ng-reflect-router-link="/auth"]')).click();
driver.sleep(3000);
driver.quit();
