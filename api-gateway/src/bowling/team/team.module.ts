import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
    imports: [HttpModule],
    controllers: [TeamController],
    providers: [TeamService]
})
export class TeamModule {}
