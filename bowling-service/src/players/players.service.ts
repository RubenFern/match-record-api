import { Inject, Injectable } from '@nestjs/common';

import { PLAYERS_REPOSITORY } from 'src/constants';
import { Player } from 'src/database/models/player.entity';

@Injectable()
export class PlayersService 
{
    constructor(
        @Inject(PLAYERS_REPOSITORY)
        private readonly playersRepository: typeof Player
    ) {}

    // TODO sobrecarga
    async create(username: string, name: string): Promise<{ message: string } | { error: string }>
    {
        // const userId = call to users service for get id user
        const player = new Player();

        player.name = name;

        try {
            await player.save();

            return { message: 'The player has just been created' };
        }
        catch (error) {
            return { error: error };
        }
    }
}
