import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'music-volume',
    templateUrl: './music-volume.component.html',
    styleUrls: ['./music-volume.component.scss'],
})
export class MusicVolumeComponent {
    @Input() muted: boolean;
    @Input() volume: number;

    @Output() gain = new EventEmitter();
    @Output() muteUnmute = new EventEmitter();

}

