import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';

import { TeamsService } from './teams.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request, Response } from 'express';
import { CreateTeamDto } from './dto/createTeam.dto';

@Controller('api/teams')
export class TeamsController 
{
    constructor(private readonly teamsService: TeamsService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Body() createTeamDto: CreateTeamDto, @Res() res: Response)
    {
        return this.teamsService.create(req, createTeamDto)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error))
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('team')
    getTeam(@Req() req: Request, @Res() res: Response)
    {
        return this.teamsService.getTeam(req)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error))
    }
}
