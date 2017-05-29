import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MusicInfoService {

    private apiKey = '92cf7b187c201c216ea7bc4619b1f78d';
    private apiSecret = 'abbc84c5bd3c0976cb7e69b1f203cc5d';
    private apiRoot = 'http://ws.audioscrobbler.com/2.0/';

    public getAlbumInfo() {
        return this.request({
            method: 'album.getinfo',
            artist: 'schiller',
            album: 'atemlos'
        }).map(data => data.album);
    }

    private request(data: {
        method: string,
        artist: string,
        album: string
    }) {

        let post = Object.assign(data, {
            api_key: this.apiKey,
            format: 'json'
        });

        return this.http.get(this.apiRoot + "?" + Object.keys(post).map(function (prop) {
            return [prop, post[prop]].map(encodeURIComponent).join("=");
        }).join("&")).map(res => res.json());
    }

    constructor(
        private http: Http,
    ) { }
}
