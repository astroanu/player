import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MusicModule } from './music/music.module';
import { Settings } from 'electron-settings';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MusicModule,
    Settings
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
