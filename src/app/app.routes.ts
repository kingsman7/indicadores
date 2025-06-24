import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPagesComponent } from './pages/markers-pages/markers-pages.component';


export const routes: Routes = [
    {
        path: 'fullscreen',
        component: FullscreenMapPageComponent,
        title: 'Fullscreen Map'
    },
    {
        path: 'markers',
        component: MarkersPagesComponent,
        title: 'Markers'
    },
    {
        path: '**',
        redirectTo: 'fullscreen'
    }
];
