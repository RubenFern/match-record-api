import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { environments } from 'environments/environments';
import { getConfigAuthorization } from 'src/helpers/getConfigAuthorization';
import { AddToTeamDto } from './dto/add-to-team.dto';
import { PlayerDto } from './dto/player.dto';

@Injectable()
export class PlayerService 
{
    constructor(private readonly httpService: HttpService) {}

    create(request: Request): Observable<AxiosResponse<{ message: string }>>
    {
        const config = getConfigAuthorization(request);

        return this.httpService.post(`${ environments.BOWLING_SERVICE }/api/players/create`, {}, config);
    }

    addPlayerToTeam(request: Request, addToTeamDto: AddToTeamDto): Observable<AxiosResponse<{ message: string }>>
    {
        const config = getConfigAuthorization(request);
        
        return this.httpService.post(`${ environments.BOWLING_SERVICE }/api/players/add-to-team`, addToTeamDto, config);
    }

    getPlayer(request: Request): Observable<AxiosResponse<PlayerDto>>
    {
        const config = getConfigAuthorization(request);

        return this.httpService.get(`${ environments.BOWLING_SERVICE }/api/players/player`, config);
    }
}
