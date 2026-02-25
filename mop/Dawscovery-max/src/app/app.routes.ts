import { Routes } from '@angular/router';
import { Login } from './views/login/login';
import { Register } from './views/register/register';
import { CreatePost } from './views/create-post/create-post';
import { Home } from './views/home/home';
import { ManageFriends } from './views/manage-friends/manage-friends';
import { AuthGuard } from '@angular/fire/auth-guard';


export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: Home
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'create-post',
        canActivate: [AuthGuard],
        component: CreatePost
    },
    {
        path: 'manage-friends',
        canActivate: [AuthGuard],
        component: ManageFriends,
    },
    {
        path: '**', redirectTo: ''
    }
];
