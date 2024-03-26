import { Module } from '@nestjs/common';

import { EncountersModule } from './encounters/encounters.module';
import { MatchsModule } from './matchs/matchs.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, PlayersModule, TeamsModule, MatchsModule, TournamentsModule, EncountersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
