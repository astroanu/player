import { Component, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';

import { TrackInfo } from './models/track-info';

import { ID3Service } from './services/id3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-120%, 0, 0)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  trackInfo:TrackInfo;
  track:any;
  position: number;
  elapsed: number;
  duration: number;
  gain: number = 80;
  paused = true;
  muted = false;

  playlist: any[] = [];

  filteredTracks: any[] = [];

  menuState:string = 'out';


   display: boolean = false;
   
  constructor(
    private playerService: PlayerService,
    private id3service : ID3Service
  ) { }

  ngOnInit() {
    this.playerService.audio.onended = this.handleEnded.bind(this);

    setInterval(this.handleTimeUpdate.bind(this), 100);
  }

  handleFile(filePath){
    this.trackInfo = this.id3service.getTrackInfo(filePath);
    this.menuState = 'in';
    this.playerService.load(filePath);
    this.playerService.play();
  }

  handleSeek(e) {
    this.playerService.audio.currentTime = e.value;
  }

  handleEnded(e) {
    this.handleRandom();
  }

  handleGain(e) {
    this.playerService.audio.volume = e.value / 100;
  }

  handleRandom() {
    //const randomTrack = this.playerService.randomTrack(this.playlist);
    //this.playerService.play(randomTrack.stream_url);
  }

  handlePausePlay() {
    if (this.playerService.audio.paused) {
      this.paused = true;
      this.playerService.audio.play()
    } else {
      this.paused = false;
      this.playerService.audio.pause()
    }
  }

  handleMuteUnmute() {
    if (this.muted) {
      this.muted = false;
      this.playerService.audio.volume = .5;
    } else {
      this.muted = true;
      this.playerService.audio.volume = 0;
    }
  }

  handleStop() {
    this.playerService.audio.pause();
    this.playerService.audio.currentTime = 0;
    this.paused = false;
  }

  handleBackward() {
    let elapsed = this.playerService.audio.currentTime;
    if (elapsed >= 5) {
      this.playerService.audio.currentTime = elapsed - 5;
    }
  }

  handleForward() {
    let elapsed = this.playerService.audio.currentTime;
    const duration = this.playerService.audio.duration;
    if (duration - elapsed >= 5) {
      this.playerService.audio.currentTime = elapsed + 5;
    }
  }

  handleTimeUpdate(e) {
    const elapsed = this.playerService.audio.currentTime;
    const duration = this.playerService.audio.duration;
    this.position = (elapsed / duration) ? (elapsed / duration) : 0;
    this.elapsed = elapsed;
    this.duration = duration;
  }

  handleQuery(payload) {
    /*this.playerService.findTracks(payload).subscribe(tracks => {
      this.filteredTracks = tracks;
    });*/
  }

  // search update
  handleUpdate(track) {
    //this.playerService.play(track.stream_url);
  }


    showDialog() {
        this.display = true;
    }
}
