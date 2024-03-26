import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { TOURNAMENTS_REPOSITORY } from 'src/constants';
import { Tournament } from 'src/database/models/tournament.entity';
import { CreateTournamentDto } from './dto/createTournament.dto';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { getCurrentDate } from '../helpers/getCurrentDate';

@Injectable()
export class TournamentsService 
{
    constructor(
        @Inject(TOURNAMENTS_REPOSITORY)
        private readonly tournamentsRepository: typeof Tournament,
        private readonly jwtService: JwtService
    ) {}

    async create(request: Request, createTournamentDto: CreateTournamentDto): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();
        
        try {
            const tournament = new Tournament();
                
            tournament.name = createTournamentDto.name;
            tournament.description = createTournamentDto.description;
            tournament.date = getCurrentDate();

            await tournament.save();

            return { message: 'The tournament has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
