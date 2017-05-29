import { Component, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { MusicService } from './music/shared/music.service';

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
        transform: 'translate3d(120%, 0, 0)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  trackInfo: TrackInfo;
  position: number;
  elapsed: number;
  duration: number;
  gain: number = 80;
  paused = true;
  muted = false;
  tracks: any[] = [];
  filteredTracks: any[] = [];
  backgroundStyle;

  menuState: string = 'out';

  constructor(
    private musicService: MusicService,
    private id3service: ID3Service
  ) { }

  ngOnInit() {
    this.musicService.getPlaylistTracks().subscribe(tracks => {
      this.tracks = tracks;
      // this.handleRandom();
    });

    this.musicService.audio.onended = this.handleEnded.bind(this);
    // this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);

    setInterval(this.handleTimeUpdate.bind(this), 100);

    /*
    
        Settings.set('name', {
          first: 'Cosmo',
          last: 'Kramer'
        });
    
        Settings.get('name.first');
        // => "Cosmo" 
    
        Settings.has('name.middle');*/

  }

  handleFile(filePath) {
    this.trackInfo = this.id3service.getTrackInfo(filePath);
    this.musicService.play(filePath);

    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  handleSeek(e) {
    this.musicService.audio.currentTime = e.value;
  }

  handleEnded(e) {
    this.handleRandom();
  }

  handleGain(e) {
    this.musicService.audio.volume = e.value / 100;
  }

  handleRandom() {
    const randomTrack = this.musicService.randomTrack(this.tracks);
    this.musicService.play(randomTrack.stream_url);
    // this.title = randomTrack.title;
  }

  handlePausePlay() {
    if (this.musicService.audio.paused) {
      this.paused = true;
      this.musicService.audio.play()
    } else {
      this.paused = false;
      this.musicService.audio.pause()
    }
  }

  handleMuteUnmute() {
    if (this.muted) {
      this.muted = false;
      this.musicService.audio.volume = .5;
    } else {
      this.muted = true;
      this.musicService.audio.volume = 0;
    }
  }

  handleStop() {
    this.musicService.audio.pause();
    this.musicService.audio.currentTime = 0;
    this.paused = false;
  }

  handleBackward() {
    let elapsed = this.musicService.audio.currentTime;
    console.log(elapsed);
    if (elapsed >= 5) {
      this.musicService.audio.currentTime = elapsed - 5;
    }
  }

  handleForward() {
    let elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration;
    if (duration - elapsed >= 5) {
      this.musicService.audio.currentTime = elapsed + 5;
    }
  }

  handleTimeUpdate(e) {
    const elapsed = this.musicService.audio.currentTime;
    const duration = this.musicService.audio.duration;
    this.position = (elapsed / duration) ? (elapsed / duration) : 0;
    this.elapsed = elapsed;
    this.duration = duration;
  }

  handleQuery(payload) {
    this.musicService.findTracks(payload).subscribe(tracks => {
      this.filteredTracks = tracks;
    });
  }

  handleUpdate(track) {
    this.musicService.play(track.stream_url);
    // this.title = track.title;
  }

}
