import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController 
{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto)
    {
        return this.authService.signIn(signInDto);
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
    @Get('profile')
    getProfile(@Req() req) 
    {
        return req.user;
    }
}
