import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';

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

    // TODO sobrecarga
    async create(request: Request): Promise<{ message: string } | { error: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });
        
        try {
            this.httpService.get<UserDto>(`${ environments.USERS_SERVICE }/users/${ payload.username }`)
                .subscribe({
                    next: async userDto => {
                        if (!userDto)
                            throw new BadRequestException('User does not exists');

                        console.log(userDto);
            
                        const player = new Player();
                
                        player.name = userDto.data.name;
                        player.username = userDto.data.username;
            
                        await player.save();
                    },
                    error: error => { 
                        throw new BadRequestException(error) 
                    } 
                });

            return { message: 'The player has just been created' };
        }
        catch (error) {
            return { error: error };
        }
    }
}
