import { Injectable } from '@angular/core';
import { readdir } from 'fs';

import { ID3Service } from './id3.service';
import { MusicInfoService } from './music-info.service';
import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable()
export class SearchService {

    private dbVersion = 3;
    private songDb;

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
        this.musicInfoService.getTrackInfo(this.id3Service.getTrackInfo(file)).subscribe((album: any) => {
            if (album) {
                this.addArtist(album).then(() => {
                    this.addAlbum(album).then(() => {
                        this.addSong(album);
                    });
                });
            }
        });
    }

    private addSong(album) {
        return this.songDb.add('songs', { name: album.artist.name });
    }

    private addArtist(album) {
        return this.songDb.add('artists', { name: album.artist.name });
    }

    private addAlbum(album) {
        return this.songDb.add('albums', { name: album.name, artist: album.artist.name });
    }

    constructor(
        private id3Service: ID3Service,
        private musicInfoService: MusicInfoService
    ) {
        this.songDb = new AngularIndexedDB('player', this.dbVersion);

        try {
            this.songDb.createStore(this.dbVersion, (evt) => {
                let objectStore = evt.currentTarget.result.createObjectStore('songs', { keyPath: "id", autoIncrement: true });

                objectStore.createIndex("file", "file", { unique: true });
            });
        } catch (e) { }

        try {
            this.songDb.createStore(this.dbVersion, (evt) => {
                let objectStore = evt.currentTarget.result.createObjectStore('artists', { keyPath: "id", autoIncrement: true });

                objectStore.createIndex("artist", "artist", { unique: true });
            });
        } catch (e) { }

        try {
            this.songDb.createStore(this.dbVersion, (evt) => {
                let objectStore = evt.currentTarget.result.createObjectStore('albums', { keyPath: "id", autoIncrement: true });
            });
        } catch (e) { }
    }
}
