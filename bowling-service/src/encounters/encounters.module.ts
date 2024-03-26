import { Module } from '@nestjs/common';

import { EncountersController } from './encounters.controller';
import { EncountersService } from './encounters.service';
import { encountersProviders } from './encounters.providers';

@Module({
  controllers: [EncountersController],
  providers: [
    EncountersService,
    ...encountersProviders
  ]
})
export class EncountersModule {}
