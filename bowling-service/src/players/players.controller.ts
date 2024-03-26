import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/createPlayer.dto';

@Controller('api/players')
export class PlayersController 
{
    constructor(private readonly playersService: PlayersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    add(@Body() createPlayerDto: CreatePlayerDto, @Res() res: Response)
    {
        return res.status(HttpStatus.CREATED).send('hola mundo');
    }
}
