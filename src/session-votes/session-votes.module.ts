import { Module } from '@nestjs/common';
import { SessionVotesService } from './session-votes.service';

@Module({
  controllers: [],
  providers: [SessionVotesService],
  exports: [SessionVotesService],
})
export class SessionVotesModule {}
