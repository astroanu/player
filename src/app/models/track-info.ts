export class TrackInfo {

  public title: string;
  public artist: string;
  public composer: string;
  public image: string;
  public genre: string;
  public length: string;
  public performerInfo: string;
  public publisher: string;
  public trackNumber: string;
  public year: string;

  public setImage(image) {
    this.image = image;
  }

  public constructor(init: any) {
    this.title = init.title ? init.title : null;
    this.artist = init.artist ? init.artist : null;
    this.composer = init.composer ? init.composer : null;
    this.genre = init.genre ? init.genre : null;
    this.length = init.length ? init.length : null;
    this.performerInfo = init.performerInfo ? init.performerInfo : null;
    this.publisher = init.publisher ? init.publisher : null;
    this.trackNumber = init.trackNumber ? init.trackNumber : null;
    this.year = init.year ? init.year : null;
  }
}