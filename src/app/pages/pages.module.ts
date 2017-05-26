import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AutoCompleteModule, SliderModule, ButtonModule } from 'primeng/primeng';

import { SidebarComponent } from './pages-sidebar/pages-sidebar.component';

const pagesRoutes: Routes = [
    {
        path: 'songs',
        component: SidebarComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(pagesRoutes),
        FormsModule,
        AutoCompleteModule,
        SliderModule,
        ButtonModule,
        HttpModule,
        CommonModule
    ],
    exports: [
        SidebarComponent
    ],
    declarations: [
        SidebarComponent
    ],
    providers: [],
})
export class PagesModule { }
