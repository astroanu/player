import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InputTextModule, SliderModule, ButtonModule } from 'primeng/primeng';

import { GeneralSettingsComponent } from './settings-general/settings-general.component';

const settingsRoutes: Routes = [
    {
        path: 'settings/general',
        component: GeneralSettingsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(settingsRoutes),
        FormsModule,
        InputTextModule,
        SliderModule,
        ButtonModule,
        HttpModule,
        CommonModule
    ],
    exports: [
        GeneralSettingsComponent
    ],
    declarations: [
        GeneralSettingsComponent
    ],
    providers: [],
})
export class SettingsModule { }
