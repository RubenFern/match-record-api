import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { teamsProviders } from './teams.providers';
import { PlayersModule } from 'src/players/players.module';

@Module({
    imports: [
        forwardRef(() => PlayersModule),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_TOKEN,
            signOptions: { expiresIn: '24h' }
        }),
        
    ],
    controllers: [TeamsController],
    providers: [
        TeamsService,
        ...teamsProviders
    ],
    exports: [TeamsService]
})
export class TeamsModule {}
