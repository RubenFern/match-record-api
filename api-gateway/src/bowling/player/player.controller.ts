import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { PlayerService } from './player.service';
import { AddToTeamDto } from './dto/add-to-team.dto';

@Controller('api/bowling/player')
export class PlayerController 
{
    constructor(private readonly playerService: PlayerService) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response)
    {
        this.playerService.create(req)
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
    @Post('add-to-team')
    addPlayerToTeam(@Req() req: Request, @Res() res: Response, @Body() addToTeamDto: AddToTeamDto)
    {
        return this.playerService.addPlayerToTeam(req, addToTeamDto)
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
