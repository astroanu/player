import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MusicInfoService {

    private apiKey = '92cf7b187c201c216ea7bc4619b1f78d';
    private apiSecret = 'abbc84c5bd3c0976cb7e69b1f203cc5d';
    private apiRoot = 'http://ws.audioscrobbler.com/2.0/';

    public getTrackInfo(id3: any) {
        return this.request({
            method: 'track.getInfo',
            artist: id3.artist,
            track: id3.title
        }).map(data => data.track);
    }

    public getAlbumInfo(id3: any) {
        return this.request({
            method: 'album.getinfo',
            artist: id3.artist,
            album: id3.album
        }).map(data => data.album);
    }

    private request(data: any) {

        let post = Object.assign(data, {
            api_key: this.apiKey,
            format: 'json'
        });

        return this.http.get(this.apiRoot + "?" + Object.keys(post).map(function (prop) {
            return [prop, post[prop]].map(encodeURIComponent).join("=");
        }).join("&")).map(res => res.json());
    }

    constructor(
        private http: Http
    ) { }
}
