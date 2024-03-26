import { Routes } from '@angular/router';

import { LayoutComponent } from './auth/pages/layout/layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { Error404Component } from './shared/pages/error404/error404.component';
import { HomeComponent } from './auth/pages/home/home.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LayoutComponent,
        canActivate: [],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [],
        children: [
            { path: 'home', component: HomeComponent }
        ]
    },
    { path: '404', component: Error404Component },

    { path: '**', redirectTo: '404' }
];
