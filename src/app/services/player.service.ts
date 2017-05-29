import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class PlayerService {

  audio;

  constructor() {
    this.audio = new Audio();
  }

  load(url) {
    this.audio.src = url;
    this.audio.load();
  }

  play() {
    this.audio.play()
  }

  getPlaylistTracks() {
  
  }

  randomTrack(tracks) {
    //const trackLength = tracks.length;
    // Pick a random number
    //const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    // Return a random track
    //return tracks[randomNumber];
  }

  findTracks(value) {
    
  }

}
