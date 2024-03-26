import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { catchError, lastValueFrom } from 'rxjs';

import { PLAYERS_REPOSITORY } from 'src/constants';
import { Player } from 'src/database/models/player.entity';
import { extractTokenFromHeader } from 'src/helpers/extractTokenFromHeader';
import { environments } from 'environments/environments';
import { UserDto } from './dto/user.dto';

@Injectable()
export class PlayersService 
{
    constructor(
        @Inject(PLAYERS_REPOSITORY)
        private readonly playersRepository: typeof Player,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService
    ) {}

    async create(request: Request): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });
        
        try {
            const userDto = await lastValueFrom(this.httpService.get<UserDto | undefined>(`${ environments.USERS_SERVICE }/users/${ payload.username }`)
                .pipe(
                    catchError(error => {
                        throw new BadRequestException(error);
                    })
                ));

            const player = new Player();
                
            player.name = userDto.data.name;
            player.username = userDto.data.username;

            await player.save();

            return { message: 'The player has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }

    async setTeam(request: Request, teamId: string): Promise<{ message: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });

        try {
            const player = await this.playersRepository.findOne({ where: { username: payload.username } });
                
            player.teamId = teamId;

            await player.save();

            return { message: 'The player has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }

    async setTeamByUsername(username: string, teamId: string): Promise<{ message: string }>
    {
        try {
            this.httpService.get<UserDto | undefined>(`${ environments.USERS_SERVICE }/users/${ username }`)
                .subscribe({
                    next: user => { 
                        if (!user)
                            throw new BadRequestException('The user does not exists');  
                    },
                    error: error => { throw new BadRequestException(error) }
                });

            const player = await this.playersRepository.findOne({ where: { username: username } });
                
            if (!player)
                throw new BadRequestException('The user is not a player of Bowling');  

            player.teamId = teamId;

            await player.save();

            return { message: 'The player has just been created' };
        }
        catch (error) {
            throw new BadRequestException(error);
        }
    }
}
