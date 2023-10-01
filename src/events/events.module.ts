import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { SessionsModule } from '../sessions/sessions.module';
import { MoviesModule } from '../movies/movies.module';
import { SessionGenresModule } from 'src/session-genres/session-genres.module';

@Module({
  imports: [SessionsModule, MoviesModule, SessionGenresModule],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
