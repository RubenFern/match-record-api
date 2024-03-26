import { BadRequestException, Inject, Injectable, UnauthorizedException, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ENCOUNTERS_REPOSITORY } from 'src/constants';
import { Encounter } from 'src/database/models/encounter.entity';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { CreateEncounterDto } from './dto/createEncounter.dto';

@Injectable()
export class EncountersService 
{
    constructor(
        @Inject(ENCOUNTERS_REPOSITORY)
        private readonly encountersRepository: typeof Encounter,
        private readonly jwtService: JwtService
    ) {}

    async create(request: Request, createEncounterDto: CreateEncounterDto): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();
        
        try {
            const encounter = new Encounter();
                
            encounter.name = createEncounterDto.name;
            encounter.description = createEncounterDto.description;
            encounter.date = this.getCurrentDate();
            encounter.tournamentId = createEncounterDto.tournamentId;

            await encounter.save();

            return { message: 'The encounter has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }

    private getCurrentDate(): Date
    {
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const formatDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

        return new Date(formatDate);
    }
}
