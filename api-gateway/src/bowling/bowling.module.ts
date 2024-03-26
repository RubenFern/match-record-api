import { Module } from '@nestjs/common';

import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { TeamModule } from './team/team.module';
import { TournamentModule } from './tournament/tournament.module';
import { EncounterModule } from './encounter/encounter.module';

@Module({
  controllers: [],
  providers: [],
  imports: [PlayerModule, MatchModule, TeamModule, TournamentModule, EncounterModule]
})
export class BowlingModule {}
