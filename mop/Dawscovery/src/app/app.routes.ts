import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Register } from './views/register/register';
import { Home } from './views/home/home';
import { Posts } from './views/posts/posts';
import { Connections } from './views/connections/connections';
import { authGuard } from './auth-guard';
import { Lists } from './views/lists/lists';

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
    {
        path: 'lists',
        canActivate: [authGuard],
        component: Lists
    },
    // {
    //     path: 'profile',
    //     component: 
    // },
    {
        path: '**',
        redirectTo: ''
    }
];
