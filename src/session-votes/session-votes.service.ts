import { Injectable } from '@nestjs/common';
import { CreateSessionVoteDto } from './dto/create-session-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionVotes } from './entities/session-votes.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class SessionVotesService {
  constructor(
    @InjectRepository(SessionVotes)
    private sessionVotesRepository: Repository<SessionVotes>,
  ) {}

  create(createSessionVoteDto: CreateSessionVoteDto) {
    return this.sessionVotesRepository.save({
      session_id: createSessionVoteDto.sessionId,
      movie_id: createSessionVoteDto.movieId,
    });
  }

  findBySession(sessionId: string) {
    return this.sessionVotesRepository.findBy({
      session_id: Equal(sessionId),
    });
  }
}
