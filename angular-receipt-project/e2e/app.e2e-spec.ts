import { AngularReceiptProjectPage } from './app.po';

describe('angular-receipt-project App', () => {
  let page: AngularReceiptProjectPage;

  beforeEach(() => {
    page = new AngularReceiptProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
