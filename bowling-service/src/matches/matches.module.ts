import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { matchesProviders } from './matches.providers';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_TOKEN,
            signOptions: { expiresIn: '24h' }
        }),
    ],
    controllers: [MatchesController],
    providers: [
        MatchesService,
        ...matchesProviders
    ],
    exports: []
})
export class MatchsModule {}
