import { Component, Input } from '@angular/core';

@Component({
  selector: 'music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss'],
})
export class MusicDetailsComponent {
  @Input() trackInfo: string;
}

