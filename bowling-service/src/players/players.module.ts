import { Module } from '@nestjs/common';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { playersProviders } from './players.providers';

@Module({
    controllers: [PlayersController],
    providers: [
        PlayersService,
        ...playersProviders
    ],
    exports: []
})
export class PlayersModule {}
