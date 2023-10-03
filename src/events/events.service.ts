import { Injectable, Logger } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { SessionsService } from '../sessions/sessions.service';
import { SessionGenresService } from '../session-genres/session-genres.service';
import { SessionVotesService } from '../session-votes/session-votes.service';
import { SessionMembersService } from '../session-members/session-members.service';

@Injectable()
export class EventsService {
  constructor(
    private sessionsService: SessionsService,
    private moviesService: MoviesService,
    private sessionGenresService: SessionGenresService,
    private sessionVotesService: SessionVotesService,
    private sessionMembersService: SessionMembersService,
  ) {}
  private readonly logger = new Logger(EventsService.name);

  async joinSession({ sessionId, userId }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
      }

      await this.sessionMembersService.create({ sessionId, userId });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async disconnectMemberFromSession({ sessionId, userId }) {
    try {
      const foundSessionMember = await this.sessionMembersService.findOne(
        sessionId,
        userId,
      );

      if (!foundSessionMember) {
        this.logger.error('Session member not found');
      }

      await this.sessionMembersService.remove(foundSessionMember);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async addSessionGenres({ sessionId, genres }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
      }

      return this.sessionGenresService.create({ sessionId, genres });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sortMoviesByGenres({ sessionId, page }) {
    const sessionGenres =
      await this.sessionGenresService.findBySession(sessionId);

    const sessionMembers =
      await this.sessionMembersService.findBySession(sessionId);

    const genres = [];
    sessionGenres.forEach((sessionGenre) =>
      genres.push(...sessionGenre.genres),
    );

    // that means that all connected users have selected their movie genres
    if (sessionGenres.length === sessionMembers.length) {
      const movies = await this.moviesService.findAll(
        sessionGenres[0].session.category,
        genres.toString(),
        page,
      );

      // get movies from api based on genres from that session
      return { movies, update: true };
    }

    // not necessary to return movies because not all users have selected their movie genres
    return { movies: [], update: false };
  }

  async addSessionVote({ sessionId, movieId }) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
      }

      return this.sessionVotesService.create({ sessionId, movieId });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getVotes({ sessionId }) {
    const sessionVotes =
      await this.sessionVotesService.findBySession(sessionId);

    const sessionMembers =
      await this.sessionMembersService.findBySession(sessionId);

    // that means that all connected users have voted
    if (sessionVotes.length === sessionMembers.length) {
      return { votes: sessionVotes, update: true };
    }

    return { votes: sessionVotes, update: false };
  }

  async chosenMovie({ sessionId, movieId }) {
    const movie = await this.moviesService.findOne(movieId);

    if (!movie) {
      this.logger.error('Movie not found');
    }

    const session = await this.sessionsService.findOne(sessionId);

    // update session with chosen movie
    await this.sessionsService.update({ ...session, movie_id: movieId });

    return movie;
  }
}
