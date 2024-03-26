import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { playersProviders } from './players.providers';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_TOKEN,
            signOptions: { expiresIn: '24h' }
        }),
        HttpModule
    ],
    controllers: [PlayersController],
    providers: [
        PlayersService,
        ...playersProviders
    ],
    exports: [PlayersService]
})
export class PlayersModule {}
