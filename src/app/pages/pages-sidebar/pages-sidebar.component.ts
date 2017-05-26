import { Component, Input } from '@angular/core';
import { readdir } from 'fs';

@Component({
    selector: 'pages-sidebar',
    templateUrl: './pages-sidebar.component.html',
    styleUrls: ['./pages-sidebar.component.scss'],
})
export class SidebarComponent {

    songs = [];

    ngOnInit() {
        readdir('C:/Users/Anuradha/Music', (err, files) => {
            console.log(err);
            this.songs = files;
        })
    }

    constructor(

    ) { }
}

