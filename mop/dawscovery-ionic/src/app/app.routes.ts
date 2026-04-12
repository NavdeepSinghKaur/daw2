import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'posts',
    loadComponent: () => import('./views/posts/posts.page').then(m => m.PostsPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./views/menu/menu.page').then(m => m.MenuPage)
  },
  {
    path: 'connections',
    loadComponent: () => import('./views/connections/connections.page').then( m => m.ConnectionsPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./views/intro/intro.page').then( m => m.IntroPage)
  },
];
