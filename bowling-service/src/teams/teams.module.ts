import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { teamsProviders } from './teams.providers';

@Module({
    imports: [
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
    exports: []
})
export class TeamsModule {}
