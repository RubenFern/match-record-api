import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { TeamDto } from './dto/team.dto';
import { getConfigAuthorization } from 'src/helpers/getConfigAuthorization';
import { environments } from 'environments/environments.prod';

@Injectable()
export class TeamService 
{
    constructor(private readonly httpService: HttpService) {}

    create(request: Request, teamDto: TeamDto): Observable<AxiosResponse<{ message: string }>>
    {
        const config = getConfigAuthorization(request);

        return this.httpService.post(`${ environments.BOWLING_SERVICE }/api/teams/create`, teamDto, config);
    }

    getTeam(request: Request): Observable<AxiosResponse<TeamDto>>
    {
        const config = getConfigAuthorization(request);

        return this.httpService.get(`${ environments.BOWLING_SERVICE }/api/teams/team`, config);
    }
}
