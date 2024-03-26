import { Controller, Get, HttpCode, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController 
{
    constructor(private readonly usersService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Get(':username')
    async findOne(@Param('username') username: string, @Res() res: Response)
    {
        return res.status(HttpStatus.OK).send(await this.usersService.findOne(username));
    }
}
