import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EncountersController } from './encounters.controller';
import { EncountersService } from './encounters.service';
import { encountersProviders } from './encounters.providers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY_TOKEN,
      signOptions: { expiresIn: '24h' }
  }),
  ],
  controllers: [EncountersController],
  providers: [
    EncountersService,
    ...encountersProviders
  ]
})
export class EncountersModule {}
