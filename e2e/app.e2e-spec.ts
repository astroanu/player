import { ScotchNgMusicPlayerPage } from './app.po';

describe('scotch-ng-music-player App', function() {
  let page: ScotchNgMusicPlayerPage;

  beforeEach(() => {
    page = new ScotchNgMusicPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
