import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { environments } from 'environments/environments.prod';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { getConfigAuthorization } from 'src/helpers/getConfigAuthorization';
import { MatchDto } from './dto/match';

@Injectable()
export class MatchService 
{
    constructor(private readonly httpService: HttpService) {}

    create(request: Request,  matchDto: MatchDto): Observable<AxiosResponse<{ message: string }>>
    {
        const config = getConfigAuthorization(request);

        return this.httpService.post(`${ environments.BOWLING_SERVICE }/api/matches/create`, { ...matchDto }, config);
    }
}
