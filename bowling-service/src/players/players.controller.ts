import { Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { PlayersService } from './players.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/players')
export class PlayersController 
{
    constructor(private readonly playersService: PlayersService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    add(@Req() req: Request, @Res() res: Response)
    {
        return this.playersService.create(req)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error))
    }
}
