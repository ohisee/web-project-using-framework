import { HighlightPage } from './app.po';

describe('highlight App', () => {
  let page: HighlightPage;

  beforeEach(() => {
    page = new HighlightPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
