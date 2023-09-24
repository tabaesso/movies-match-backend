import { Injectable, Logger } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class EventsService {
  constructor(
    private sessionsService: SessionsService,
    private moviesService: MoviesService,
  ) {}
  private readonly logger = new Logger(EventsService.name);

  async joinSession({ sessionId, userId }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
        throw new Error('Session not found');
      }

      await this.sessionsService.addUser(sessionId, userId);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Something went wrong with this session');
    }
  }

  async addSessionGenres({ sessionId, genres }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
        throw new Error('Session not found');
      }

      return this.sessionsService.addGenres(sessionId, genres);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Something went wrong with this session');
    }
  }

  async sortMoviesByGenres({ sessionId }) {
    // get genres from session
    // get session members
    // se retornar o nr de registros de filmes igual ao nr de usuarios da sessão, setar a flag update para true
    // get movies from api based on genres from that session
    return { movies: [], update: true };
  }

  async addSessionVote({ sessionId, movieId }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
        throw new Error('Session not found');
      }

      return this.sessionsService.addVote(sessionId, movieId);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Something went wrong with this session');
    }
  }

  async getVotes({ sessionId }) {
    return { votes: [], update: true };
  }

  async chosenMovie({ sessionId, movieId }) {

    const movie = await this.moviesService.findOne(movieId);

    return { id: '123', title: 'Movie 1', overview: 'Overview 1' };
  }
}
