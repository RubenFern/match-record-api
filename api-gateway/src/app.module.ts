import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BowlingModule } from './bowling/bowling.module';

@Module({
  imports: [AuthModule, BowlingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
