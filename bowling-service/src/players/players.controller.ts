import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { PlayersService } from './players.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AddToTeamDto } from './dto/add-to-team.dto';

@Controller('api/players')
export class PlayersController 
{
    constructor(private readonly playersService: PlayersService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response)
    {
        return this.playersService.create(req)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('add-to-team')
    addPlayerToTeam(@Req() req: Request, @Res() res: Response, @Body() addToTeamDto: AddToTeamDto)
    {
        return this.playersService.addPlayerToTeam(req, addToTeamDto.username, addToTeamDto.teamName)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }
}
