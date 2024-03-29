import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { MATCHS_REPOSITORY } from 'src/constants';
import { Match } from 'src/database/models/match.entity';
import { CreateMatchDto } from './dto/createMatch.dto';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { getCurrentDate } from 'src/helpers/getCurrentDate';
import { PlayersService } from 'src/players/players.service';
import { PlayerDto } from 'src/players/dto/player.dto';

@Injectable()
export class MatchesService 
{
    constructor(
        @Inject(MATCHS_REPOSITORY)
        private readonly matchesRepository: typeof Match,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => PlayersService))
        private readonly playerService: PlayersService
    ) {}

    async createAuth(request: Request, createMatchDto: CreateMatchDto): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });

        return this.create(createMatchDto, payload.username);
    }

    async createByUsername(createMatchDto: CreateMatchDto, username: string): Promise<{ message: string }>
    {
        return this.create(createMatchDto, username);
    }

    private async create(createMatchDto: CreateMatchDto, username: string): Promise<{ message: string }>
    {
        try {
            const match = new Match();
            const player: PlayerDto = await this.playerService.getPlayerByUsername(username);
                
            if (!player)
                throw new BadRequestException('The player does not exists');
            
            if (createMatchDto.encounterId)
                match.encounterId = createMatchDto.encounterId;

            match.playerId = player.id;
            match.throw01 = createMatchDto.throw01;
            match.throw02 = createMatchDto.throw02;
            match.throw03 = createMatchDto.throw03;
            match.throw04 = createMatchDto.throw04;
            match.throw05 = createMatchDto.throw05;
            match.throw06 = createMatchDto.throw06;
            match.throw07 = createMatchDto.throw07;
            match.throw08 = createMatchDto.throw08;
            match.throw09 = createMatchDto.throw09;
            match.throw10 = createMatchDto.throw10;
            match.date = getCurrentDate();

            await match.save();

            return { message: 'The match has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
