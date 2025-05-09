import { Routes } from '@angular/router';

export const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'auth/login', // Or your preferred default path like 'home'
  //   pathMatch: 'full'
  // }
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'auth/login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'auth/register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  }
];
