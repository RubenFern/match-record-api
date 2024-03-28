import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';

@Controller('api/bowling/teams')
export class TeamController 
{
    constructor(
        private readonly teamService: TeamService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response, @Body() teamDto: TeamDto)
    {
        this.teamService.create(req, teamDto)
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

    @HttpCode(HttpStatus.OK)
    @Get('team')
    getPlayer(@Req() req: Request, @Res() res: Response)
    {
        return this.teamService.getTeam(req)
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
