import { MetabMasterPage } from './app.po';

describe('metab-master App', () => {
  let page: MetabMasterPage;

  beforeEach(() => {
    page = new MetabMasterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
