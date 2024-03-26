import { Module } from '@nestjs/common';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { teamsProviders } from './teams.providers';

@Module({
    controllers: [TeamsController],
    providers: [
        TeamsService,
        ...teamsProviders
    ],
    exports: []
})
export class TeamsModule {}
