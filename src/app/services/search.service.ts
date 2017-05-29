import { Injectable } from '@angular/core';
import { readdir } from 'fs';

import { ID3Service } from './id3.service';

@Injectable()
export class SearchService {

    private indexDb;

    public indexFolder(path: string) {
        //console.log(path);
        this.indexFile('234');
        /* readdir(path, (err, files) => {
             files.filter((f) => {
                 return f.slice(-3) == 'mp3';
             }).forEach((file) => {
                 console.log(file);
                 this.indexFile(file);
             });
         })*/

         //console.log(this.indexDb.ydn);
    }

    public indexFile(file: string) {
        
    }

    constructor(
        private id3Service: ID3Service
    ) {
    }
}
