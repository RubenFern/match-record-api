import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { TEAMS_REPOSITORY } from 'src/constants';
import { Team } from 'src/database/models/team.entity';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { CreateTeamDto } from './dto/createTeam.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class TeamsService 
{
    constructor(
        @Inject(TEAMS_REPOSITORY)
        private readonly teamsRepository: typeof Team,
        private readonly jwtService: JwtService,
        private readonly playersService: PlayersService
    ) {}

    async create(request: Request, createTeamDto: CreateTeamDto): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });
        
        try {
            const team = new Team();
                
            team.owner = payload.username;
            team.name = createTeamDto.name;
            team.image = createTeamDto.image;
            team.ubication = createTeamDto.ubication;
            team.foundationYear = createTeamDto.foundationYear;

            const insertedTeam = await team.save();

            await this.playersService.setTeamByUsername(payload.username, insertedTeam.id);

            return { message: 'The team has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
