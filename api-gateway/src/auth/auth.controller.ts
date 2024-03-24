import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController 
{
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() signUpDto: SignUpDto, @Res() res: Response)
    {
        this.authService.signUp(signUpDto)
            .subscribe({
                next: result => res.status(HttpStatus.OK).send(result.data),
                error: error => {
                    if (error.response.data.message)
                        res.status(HttpStatus.BAD_REQUEST).send({ error: error.response.data.message[0].message });
                    else
                        res.status(HttpStatus.BAD_REQUEST).send(error) 
                }
            });
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Res() res: Response)
    {
        this.authService.signIn(signInDto)
            .subscribe({
                next: result => res.status(HttpStatus.OK).send(result.data),
                error: error => {
                    if (error.response.data.message[0].message)
                        res.status(HttpStatus.BAD_REQUEST).send({ error: error.response.data.message[0].message })
                    else if (error.response.data.message)
                        res.status(HttpStatus.BAD_REQUEST).send({ error: error.response.data.message })
                    else 
                        res.status(HttpStatus.BAD_REQUEST).send(error)
                }
            });
    }
}
