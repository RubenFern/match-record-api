import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { MATCHS_REPOSITORY } from 'src/constants';
import { Match } from 'src/database/models/match.entity';
import { CreateMatchDto } from './dto/createMatch.dto';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { getCurrentDate } from 'src/helpers/getCurrentDate';

@Injectable()
export class MatchesService 
{
    constructor(
        @Inject(MATCHS_REPOSITORY)
        private readonly matchesRepository: typeof Match,
        private readonly jwtService: JwtService,
    ) {}

    async create(request: Request, createMatchDto: CreateMatchDto): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();
        
        try {
            const match = new Match();
                
            match.encounterId = createMatchDto.encounterId;
            match.playerId = createMatchDto.playerId;
            match.date = getCurrentDate();

            await match.save();

            return { message: 'The match has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
