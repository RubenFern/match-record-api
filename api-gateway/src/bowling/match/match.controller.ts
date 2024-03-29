import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MatchService } from './match.service';
import { MatchDto } from './dto/match';

@Controller('api/bowling/matches')
export class MatchController 
{
    constructor(private readonly matchService: MatchService) {}

    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response, @Body() matchDto: MatchDto)
    {
        this.matchService.create(req, matchDto)
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
