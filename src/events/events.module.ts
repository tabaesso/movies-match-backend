import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { SessionsModule } from '../sessions/sessions.module';
import { MoviesModule } from '../movies/movies.module';
import { SessionGenresModule } from '../session-genres/session-genres.module';
import { SessionVotesModule } from '../session-votes/session-votes.module';
import { SessionMembersModule } from 'src/session-members/session-members.module';

@Module({
  imports: [
    SessionsModule,
    MoviesModule,
    SessionGenresModule,
    SessionVotesModule,
    SessionMembersModule,
  ],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
