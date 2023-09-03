import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { sessionsProviders } from './sessions.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionsController],
  providers: [...sessionsProviders, SessionsService],
})
export class SessionsModule {}
