import { Module } from '@nestjs/common';
import { SessionVotesService } from './session-votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionVotes } from './entities/session-votes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionVotes])],
  controllers: [],
  providers: [SessionVotesService],
  exports: [SessionVotesService],
})
export class SessionVotesModule {}
