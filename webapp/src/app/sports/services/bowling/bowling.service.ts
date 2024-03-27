import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Player } from './interfaces';
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
        console.log("lo creamos");
        return of(true);
    }
}
