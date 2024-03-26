import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { TournamentsService } from './tournaments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTournamentDto } from './dto/createTournament.dto';

@Controller('api/tournaments')
export class TournamentsController 
{
    constructor(private readonly tournamentsService: TournamentsService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response, @Body() createTournamentDto: CreateTournamentDto)
    {
        return this.tournamentsService.create(req, createTournamentDto)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }
}
