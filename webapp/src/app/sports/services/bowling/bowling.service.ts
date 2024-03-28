import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Player, Team } from './interfaces';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BowlingService
{
    constructor(private http: HttpClient) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

    public isUserPlayer(): Observable<boolean>
    {
        return this.http.get<Player>(`${ environments.API_GATEWAY }/bowling/players/player`, { headers: this.headers })
            .pipe(
                catchError( () => of(false) ),
                map(value => !!value )
            );
    }

    public createPlayer(): Observable<boolean>
    {
        return this.http.post(`${ environments.API_GATEWAY }/bowling/players/create`, {}, { headers: this.headers })
            .pipe(
                catchError( () => of(false) ),
                map(value => !!value )
            );
    }

    public createTeam(name: string, ubication: string, image: string, foundationYear: number): Observable<boolean>
    {
        return this.http.post(`${ environments.API_GATEWAY }/bowling/teams/create`, { name, ubication, image, foundationYear }, { headers: this.headers })
            .pipe(
                catchError( () => of(false) ),
                map(value => !!value )
            );
    }

    public getTeam(): Observable<Team | undefined>
    {
        return this.http.get<Team>(`${ environments.API_GATEWAY }/bowling/teams/team`, { headers: this.headers })
            .pipe(
                catchError( () => of(undefined) )
            );
    }
}
