import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { matchesProviders } from './matches.providers';
import { PlayersModule } from 'src/players/players.module';

@Module({
    imports: [
        forwardRef(() => PlayersModule),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_TOKEN,
            signOptions: { expiresIn: '24h' }
        })
    ],
    controllers: [MatchesController],
    providers: [
        MatchesService,
        ...matchesProviders
    ],
    exports: []
})
export class MatchsModule {}
