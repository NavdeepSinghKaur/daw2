import { Routes } from '@angular/router';
import { authGuard, loggedGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.page').then(m => m.LoginPage),
    canActivate: [loggedGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register/register.page').then(m => m.RegisterPage),
    canActivate: [loggedGuard]
  },
  {
    path: 'posts',
    loadComponent: () => import('./views/posts/posts.page').then(m => m.PostsPage),
    canActivate: [authGuard]
  },
  {
    path: 'connections',
    loadComponent: () => import('./views/connections/connections.page').then(m => m.ConnectionsPage),
    canActivate: [authGuard]
  },
  {
    path: 'intro',
    loadComponent: () => import('./views/intro/intro.page').then(m => m.IntroPage),
    canActivate: [loggedGuard]
  },
  {
    path: 'create-post',
    loadComponent: () => import('./views/create-post/create-post.page').then( m => m.CreatePostPage)
  },
];
