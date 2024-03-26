import { Module } from '@nestjs/common';

import { MatchsController } from './matchs.controller';
import { MatchsService } from './matchs.service';
import { matchsProviders } from './matchs.providers';

@Module({
    controllers: [MatchsController],
    providers: [
        MatchsService,
        ...matchsProviders
    ],
    exports: []
})
export class MatchsModule {}
