import { Injectable } from '@angular/core';
import { readdir } from 'fs';

import { ID3Service } from './id3.service';

const Elasticlunr = require("./../../../node_modules/elasticlunr/elasticlunr.js");

@Injectable()
export class SearchService {

    private index;

    public indexFolder(path: string) {
        console.log(path);
        this.indexFile('234');
        /* readdir(path, (err, files) => {
             files.filter((f) => {
                 return f.slice(-3) == 'mp3';
             }).forEach((file) => {
                 console.log(file);
                 this.indexFile(file);
             });
         })*/
    }

    public indexFile(file: string) {
        /* this.index.addDoc({
             "id": 1,
             "title": "Oracle released its latest database Oracle 12g",
             "body": "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
         });*/

        console.log(this.index.search("Oracle database", {
            fields: {
                title: { boost: 2 },
                body: { boost: 1 }
            },
            boolean: "OR"
        }));
    }

    constructor(
        private id3Service: ID3Service
    ) {

        Elasticlunr.Configuration = function (config, fields) {
            var config = config || '';

            if (fields == undefined || fields == null) {
                throw new Error('fields should not be null');
            }

            this.config = {};

            var userConfig;
            try {
                userConfig = JSON.parse(config);
                this.buildUserConfig(userConfig, fields);
            } catch (error) {
                Elasticlunr.utils.warn('user configuration parse failed, will use default configuration');
                this.buildDefaultConfig(fields);
            }
        };


        this.index = Elasticlunr((config: any) => {
            config.addField('title');
            config.addField('body');
            config.setRef('id');

            return config;
        });
    }
}
