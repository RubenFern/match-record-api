import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { TEAMS_REPOSITORY } from 'src/constants';
import { Team } from 'src/database/models/team.entity';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { CreateTeamDto } from './dto/createTeam.dto';
import { PlayersService } from 'src/players/players.service';
import { TeamDto } from './dto/team.dto';
import { PlayerDto } from 'src/players/dto/player.dto';

@Injectable()
export class TeamsService 
{
    constructor(
        @Inject(TEAMS_REPOSITORY)
        private readonly teamsRepository: typeof Team,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => PlayersService))
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

    async findByName(name: string): Promise<TeamDto | undefined>
    {
        const team: Team = await this.teamsRepository.findOne({ where: { name: name } });

        if (!team)
            return undefined;

        const teamDto = new TeamDto();

        teamDto.id = team.id;
        teamDto.owner = team.owner;
        teamDto.name = team.name;
        teamDto.image = team.image;
        teamDto.ubication = team.ubication;
        teamDto.foundationYear = team.foundationYear;

        return teamDto;
    }

    async getTeam(request: Request): Promise<TeamDto | undefined>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        try {
            const player: PlayerDto = await this.playersService.getPlayer(request);

            if (!player.teamId)
                return undefined;

            const team: Team = await this.teamsRepository.findOne({ where: { id: player.teamId } });

            if (!team)
                return undefined;

            const teamDto: TeamDto = new TeamDto();

            teamDto.id = team.id;
            teamDto.owner = team.owner;
            teamDto.name = team.name;
            teamDto.image = team.image;
            teamDto.ubication = team.ubication;
            teamDto.foundationYear = team.foundationYear;

            console.log(teamDto);

            return teamDto;
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
