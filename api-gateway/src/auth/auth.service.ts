import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { SignUpDto } from './dto/signUp.dto';
import { USERS_API } from 'src/constants';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService 
{
    constructor(private readonly httpService: HttpService) {}

    signUp(signUpDto: SignUpDto): Observable<AxiosResponse<{ message: string }>>
    {
        return this.httpService.post(`${USERS_API}/register`, { ...signUpDto });
    }

    signIn(signInDto: SignInDto): Observable<AxiosResponse<{ message: string }>>
    {
        return this.httpService.post(`${USERS_API}/login`, { ...signInDto });
    }
}
