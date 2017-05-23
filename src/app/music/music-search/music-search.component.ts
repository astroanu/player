import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent {

  track: string;
  @Input() tracks: any[];

  @Output() update = new EventEmitter();
  @Output() query = new EventEmitter();

  search(event) {
    this.query.emit(event.query);
  }

  select(track) {
    this.update.emit(track);
  }
}
