import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { MatchesService } from './matches.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateMatchDto } from './dto/createMatch.dto';

@Controller('api/matches')
export class MatchesController 
{
    constructor(private readonly matchesService: MatchesService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response, @Body() createMatchDto: CreateMatchDto)
    {
        return this.matchesService.create(req, createMatchDto)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }
}
