import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'music-progress',
  templateUrl: './music-progress.component.html',
  styleUrls: ['./music-progress.component.scss'],
})
export class MusicProgressComponent {
  @Input() elapsed: string;
  @Input() total: string;
  @Input() current: number;
  @Input() progress: number;

  @Output() seek = new EventEmitter();

}

