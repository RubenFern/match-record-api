import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Token, User } from '../interfaces/user.interface';

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

    public login(username: string, password: string): Observable<boolean>
    {
        this.http.post<Token>(`${ environments.API_GATEWAY }/auth/login`, { username, password })
            .pipe(
                tap( token =>
                {
                    if (token.token)
                        localStorage.setItem('token', token.token)
                })
            )
            .subscribe();

        return of(localStorage.getItem('token') !== null);
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
