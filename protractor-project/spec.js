describe('Protractor Demo App', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngularEnabled(true);
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Express Angular');
  });

  it('should have a binding', function() {
    expect(element(by.css('[ng-reflect-router-link="/messagener"]')).getText()).toEqual('Messagener');
    expect(element(by.css('[ng-reflect-router-link="/auth"]')).getText()).toEqual('Authentication');
  });

  it('click on messagener', function() {
    var mc = element(by.css('[ng-reflect-router-link="/messagener"]'));
    mc.click();
    var messagener = element(by.css('app-messagener'));
    var auth = element(by.css('app-auth'));
    expect(messagener).not.toBe(null);
    expect(auth === null);
  });

  it('click on authentication', function() {
    var au = element(by.css('[ng-reflect-router-link="/auth"]'));
    au.click();
    var messagener = element(by.css('app-messagener'));
    var auth = element(by.css('app-auth'));
    expect(messagener === null);
    expect(auth !== null);
  });

  it('change text', function() {
    var im = element(by.css('[ng-reflect-model="angular testing"]'));
    expect(im).not.toBe(null);
    im.sendKeys(' more more more');
    expect(element(by.css('h2')).getText()).toEqual('Hello Title angular testing more more more');
    var bu = element(by.id('abutton'));
    expect(by).not.toBe(null);
  });

});
