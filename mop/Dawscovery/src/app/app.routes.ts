import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Register } from './views/register/register';
import { Home } from './views/home/home';
import { Posts } from './views/posts/posts';
import { Connections } from './views/connections/connections';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: '',
        canActivate: [authGuard],
        component: Home,
    },
    {
        path: 'posts',
        canActivate: [authGuard],
        component: Posts,
    },
    {
        path: 'connections',
        canActivate: [authGuard],
        component: Connections,
    },
    // {
    //     path: 'profile',
    //     component: 
    // },
    {
        path: '**',
        canActivate: [authGuard],
        redirectTo: ''
    }
];
