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
            const userDto = await lastValueFrom(this.httpService.get<UserDto>(`${ environments.USERS_SERVICE }/users/${ payload.username }`)
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
}
