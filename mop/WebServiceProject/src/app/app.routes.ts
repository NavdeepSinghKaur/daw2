import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Vin } from './view/vin/vin';
import { Model } from './view/model/model';
import { Photo } from './view/photo/photo';
import { googleAuthGuard } from './google-auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [googleAuthGuard]
    },
    {
        path: 'vin',
        component: Vin,
        canActivate: [googleAuthGuard]
    },
    {
        path: 'model',
        component: Model,
        canActivate: [googleAuthGuard]
    },
    {
        path: 'photo',
        component: Photo,
        canActivate: [googleAuthGuard]
    }
];
