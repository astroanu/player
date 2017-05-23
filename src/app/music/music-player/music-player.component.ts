import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent {
  @Input() paused;
  @Output() backward = new EventEmitter();
  @Output() pauseplay = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() random = new EventEmitter();
  @Output() stop = new EventEmitter();
}

