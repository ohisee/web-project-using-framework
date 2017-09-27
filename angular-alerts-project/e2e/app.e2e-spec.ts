import { AngularAlertsProjectPage } from './app.po';

describe('angular-alerts-project App', () => {
  let page: AngularAlertsProjectPage;

  beforeEach(() => {
    page = new AngularAlertsProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
