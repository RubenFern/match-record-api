import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { tournamentsProviders } from './tournaments.providers';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_TOKEN,
            signOptions: { expiresIn: '24h' }
        }),
    ],
    controllers: [TournamentsController],
    providers: [
        TournamentsService,
        ...tournamentsProviders
    ],
    exports: []
})
export class TournamentsModule {}
