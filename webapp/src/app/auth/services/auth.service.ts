import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Auth, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    constructor(private http: HttpClient) {}

    get currentUser(): User | undefined
    {
        return undefined;
    }

    public login(username: string, password: string): Observable<string>
    {
        return this.http.post<Auth>(`${ environments.API_GATEWAY }/auth/login`, { username, password })
            .pipe(
                catchError(error =>
                {
                    return of(error.error);
                }),
                map(value =>
                {
                    if (value.token)
                    {
                        localStorage.setItem('token', value.token);
                        return '';
                    }
                    else
                        return value.error;
                })
            );
    }

    public register(name: string, username: string, email: string, password: string): Observable<string>
    {
        return this.http.post<Auth>(`${ environments.API_GATEWAY }/auth/register`, { name, username, email, password })
            .pipe(
                catchError(error =>
                {
                    return of(error.error);
                }),
                map(value =>
                {
                    if (value.token)
                    {
                        localStorage.setItem('token', value.token);
                        return '';
                    }
                    else
                    {
                        return value.error;
                    }
                })
            );
    }

    /*public checkAuthentication(): Observable<boolean>
    {
        const token = localStorage.getItem('token');

        if (!token)
            return of(false);

        this.http.get<User>(`${ environments.API_GATEWAY }/users/1`)
            .pipe(
                tap( user => this.user = user ),
                map( user => !!user ),
                catchError( () => of(false) )
            );

        return of(true);
    }*/

    public logout(): void
    {
        localStorage.clear();
    }
}
