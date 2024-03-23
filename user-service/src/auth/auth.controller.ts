import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signUp.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Res() res: Response)
    {
        return this.authService.signIn(signInDto)
            .then(token => res.status(HttpStatus.CREATED).send(token))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() signUpDto: SignUpDto, @Res() res: Response)
    {
        this.authService.signUp(signUpDto)
            .then(token => res.status(HttpStatus.CREATED).send(token))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send({ error: error.errors[0].message }));
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('logout')
    logout(@Req() req: Request, @Res() res: Response)
    {
        this.authService.logout(req)
            .then(message => res.status(HttpStatus.OK).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }

    @UseGuards(AuthGuard)
    @Get('validate-token')
    validateToken(@Req() req) 
    {
        return req.user;
    }
}
