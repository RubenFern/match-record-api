import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { EncountersService } from './encounters.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request, Response } from 'express';
import { CreateEncounterDto } from './dto/createEncounter.dto';

@Controller('api/encounters')
export class EncountersController 
{
    constructor(private readonly encountersService: EncountersService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Req() req: Request, @Res() res: Response, @Body() createEncounterDto: CreateEncounterDto)
    {
        return this.encountersService.create(req, createEncounterDto)
            .then(message => res.status(HttpStatus.CREATED).send(message))
            .catch(error => res.status(HttpStatus.BAD_REQUEST).send(error));
    }
}
