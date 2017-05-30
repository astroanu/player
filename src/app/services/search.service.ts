import { Injectable } from '@angular/core';
import { readdir } from 'fs';

import { ID3Service } from './id3.service';
import { MusicInfoService } from './music-info.service';

@Injectable()
export class SearchService {

    private worker;

    public indexFolder(path: string) {
        readdir(path, (err, files) => {
            files.filter((f) => {
                return f.slice(-3) == 'mp3';
            }).forEach((file) => {
                this.indexFile(path + '/' + file);
            });
        });
    }

    public indexFile(file: string) {
        this.musicInfoService.getTrackInfo(this.id3Service.getTrackInfo(file)).subscribe((track: any) => {
            if (track) {
                this.worker.postMessage(['addTrack', {
                    file:file,
                    track:track
                }]);
            }
        });
    }

    constructor(
        private id3Service: ID3Service,
        private musicInfoService: MusicInfoService
    ) {
        this.worker = new Worker('worker.js');

        this.worker.onmessage = function(e){
            console.log(e.data);
        };
    }
}
