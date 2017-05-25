import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { AutoCompleteModule, SliderModule, ButtonModule } from 'primeng/primeng';


import { MusicSettingsComponent } from './music-settings/music-settings.component';
import { MusicSearchComponent } from './music-search/music-search.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicDetailsComponent } from './music-details/music-details.component';
import { MusicProgressComponent } from './music-progress/music-progress.component';
import { MusicVolumeComponent } from './music-volume/music-volume.component';
import { MusicFooterComponent } from './music-footer/music-footer.component';

import { FormatTimePipe } from './format-time-pipe';

import { MusicService } from './shared/music.service';
import { ApiService } from './shared/api.service';

@NgModule({
  imports: [
    FormsModule,
    AutoCompleteModule,
    SliderModule,
    ButtonModule,
    HttpModule,
    CommonModule
  ],
  exports: [
    MusicSettingsComponent,
    MusicSearchComponent,
    MusicDetailsComponent,
    MusicPlayerComponent,
    MusicProgressComponent,
    MusicVolumeComponent,
    MusicFooterComponent,
    FormatTimePipe
  ],
  declarations: [
    MusicSettingsComponent,
    MusicSearchComponent,
    MusicDetailsComponent,
    MusicPlayerComponent,
    MusicProgressComponent,
    MusicVolumeComponent,
    MusicFooterComponent,
    FormatTimePipe
  ],
  providers: [
    ApiService,
    MusicService
  ],
})
export class MusicModule { }
