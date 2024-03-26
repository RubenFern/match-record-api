import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { environments } from 'environments/environments';

@Injectable()
export class AuthService
{
    constructor(private readonly httpService: HttpService) {}

    signUp(signUpDto: SignUpDto): Observable<AxiosResponse<{ message: string }>>
    {
        return this.httpService.post(`${ environments.USERS_SERVICE }/auth/register`, { ...signUpDto });
    }

    signIn(signInDto: SignInDto): Observable<AxiosResponse<{ message: string }>>
    {
        return this.httpService.post(`${ environments.USERS_SERVICE }/auth/login`, { ...signInDto });
    }
}
