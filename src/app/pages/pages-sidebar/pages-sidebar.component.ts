import { Component, Input, Output, EventEmitter } from '@angular/core';
import { readdir } from 'fs';

@Component({
    selector: 'pages-sidebar',
    templateUrl: './pages-sidebar.component.html',
    styleUrls: ['./pages-sidebar.component.scss'],
})
export class SidebarComponent {

    @Output() file = new EventEmitter();

    private path = 'C:/Users/Anuradha/Music';

    files = [];

    sideMenuItems= [
        {
            label: 'File',
            url:'settings/general'
        }
    ];

    handleClickFile(file) {
        this.file.emit(this.path + '/' + file);
    }

    ngOnInit() {
        readdir(this.path, (err, files) => {
            this.files = files.filter((f) => {
                return f.slice(-3) == 'mp3';
            });
        })
    }

    constructor(

    ) { }
}

