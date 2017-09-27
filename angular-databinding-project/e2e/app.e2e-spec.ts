import { AngularDatabindingProjectPage } from './app.po';

describe('angular-databinding-project App', () => {
  let page: AngularDatabindingProjectPage;

  beforeEach(() => {
    page = new AngularDatabindingProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
