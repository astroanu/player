import { Injectable } from '@angular/core';

import { TrackInfo } from '../models/track-info';

const nodeID3 = require("./../../../node_modules/node-id3/index.js"); 

@Injectable()
export class ID3Service {

    getTrackInfo(filePath): TrackInfo {
        return new TrackInfo( nodeID3.read(filePath));
    }

}
