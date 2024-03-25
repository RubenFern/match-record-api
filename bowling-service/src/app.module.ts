import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { MatchsModule } from './matchs/matchs.module';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [PlayersModule, TeamsModule, MatchsModule, TournamentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
