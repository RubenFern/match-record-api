import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
    imports: [HttpModule],
    controllers: [MatchController],
    providers: [MatchService]
})
export class MatchModule {}
