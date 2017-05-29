import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng/primeng';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MusicModule } from './music/music.module';
import { PagesModule } from './pages/pages.module';
import { SettingsModule } from './settings/settings.module';

import { ID3Service } from './services/id3.service';
import { PlayerService } from './services/player.service';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MusicModule,
    PagesModule,
    SettingsModule,
    DialogModule
  ],
  providers: [
    PlayerService,
    ID3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
