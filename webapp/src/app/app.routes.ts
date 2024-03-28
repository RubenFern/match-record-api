import { Routes } from '@angular/router';

import { LayoutComponent as AuthLayout } from './shared/layouts/auth/layout/layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { Error404Component } from './shared/pages/error404/error404.component';
import { HomeComponent } from './home/pages/home.component';
import { BowlingComponent } from './sports/pages/bowling/bowling.component';
import { MyTeamComponent } from './sports/pages/bowling/home/my-team/my-team.component';
import { LayoutComponent as BowlingLayout } from './shared/layouts/sports/bowling/layout/layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayout,
        canActivate: [],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    { path: 'home', canActivate: [], component: HomeComponent },
    {
        path: 'sports',
        canActivate: [],
        children: [
            {
                path: 'bowling',
                component: BowlingLayout,
                children: [
                    { path: '', component: BowlingComponent },
                    { path: 'my-team', component: MyTeamComponent }
                ]
            },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
