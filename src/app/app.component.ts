import { Component, OnInit } from '@angular/core';
import { MusicService } from './music/shared/music.service';
//import * as nodeID3  from 'node-id3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title;
  position: number;
  elapsed: number;
  duration: number;
  gain: number = 80;
  paused = true;
  muted = false;
  tracks: any[] = [];
  filteredTracks: any[] = [];
  backgroundStyle;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.musicService.getPlaylistTracks().subscribe(tracks => {
      this.tracks = tracks;
      // this.handleRandom();
    });

    this.musicService.audio.onended = this.handleEnded.bind(this);
   // this.musicService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);

    setInterval(this.handleTimeUpdate.bind(this), 1000);

    /*
    
        Settings.set('name', {
          first: 'Cosmo',
          last: 'Kramer'
        });
    
        Settings.get('name.first');
        // => "Cosmo" 
    
        Settings.has('name.middle');*/

  }

  handleFile(filePath){
    //var read = nodeID3.read(filePath);
    //console.log(read);
    this.musicService.play(filePath);
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
    this.title = randomTrack.title;
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
    this.title = track.title;
  }

}
