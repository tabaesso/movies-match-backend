import { Injectable } from '@nestjs/common';
import { CreateSessionGenreDto } from './dto/create-session-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionGenres } from './entities/session-genres.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class SessionGenresService {
  constructor(
    @InjectRepository(SessionGenres)
    private sessionGenresRepository: Repository<SessionGenres>,
  ) {}

  create(createSessionGenreDto: CreateSessionGenreDto) {
    return this.sessionGenresRepository.save({
      session_id: createSessionGenreDto.sessionId,
      genres: createSessionGenreDto.genres,
    });
  }

  findBySession(sessionId: string) {
    return this.sessionGenresRepository.findBy({
      session_id: Equal(sessionId),
    });
  }
}
