import { Injectable } from '@angular/core';

import { TrackInfo } from '../models/track-info';

const nodeID3 = require("./../../../node_modules/node-id3/index.js");

import { MusicInfoService } from './music-info.service';

@Injectable()
export class ID3Service {

    getTrackInfo(filePath): TrackInfo {
        let id3Info = nodeID3.read(filePath);

        let trackInfo = new TrackInfo(id3Info);

        this.musicInfoService.getAlbumInfo(id3Info).subscribe((album: any) => {
            if(album){
                trackInfo.setImage(album.image[1]['#text']);
            }
        });

        return trackInfo;
    }

    constructor(
        private musicInfoService: MusicInfoService,
    ) { }
}
