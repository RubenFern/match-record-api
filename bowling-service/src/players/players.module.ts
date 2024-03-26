import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { playersProviders } from './players.providers';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
    imports: [
        forwardRef(() => TeamsModule),
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
