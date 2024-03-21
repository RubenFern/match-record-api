import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";

import { UsersService } from './users.service';
import { Response } from "express";
import { CreateUserDto } from './dto/create.dto';

@Controller('users')
export class UsersController
{
    constructor(private readonly usersService: UsersService) {}

    @Post('add')
    add(@Body() createUserDto: CreateUserDto, @Res() res: Response)
    {
        this.usersService.add(createUserDto)
            .then(user => {
                res.status(HttpStatus.CREATED).send({ user: user });
            })
            .catch(error => {
                res.status(HttpStatus.BAD_REQUEST).send({ error: error.errors[0].message });
            });
    }
}