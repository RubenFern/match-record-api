import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { Error404Component } from './shared/pages/error404/error404.component';
import { HomeComponent } from './home/pages/home.component';

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
        path: 'app',
        component: LayoutComponent,
        canActivate: [],
        children: [
            { path: 'home', component: HomeComponent }
        ]
    },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
