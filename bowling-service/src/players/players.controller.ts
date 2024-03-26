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
        return this.playersService.create(createPlayerDto.username, createPlayerDto.name)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error))
    }
}
