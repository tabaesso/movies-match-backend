import { Injectable, Logger } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { SessionsService } from '../sessions/sessions.service';
import { SessionGenresService } from '../session-genres/session-genres.service';
import { SessionVotesService } from '../session-votes/session-votes.service';
import { SessionMembersService } from '../session-members/session-members.service';
import * as _ from 'lodash';

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

      const foundSessionMember = await this.sessionMembersService.findOne(
        sessionId,
        userId,
      );

      if (!foundSessionMember && findSession.isOpen) {
        return this.sessionMembersService.create({ sessionId, userId });
      }

      return foundSessionMember;
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
        return;
      }

      await this.sessionMembersService.remove(foundSessionMember);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async startSession(sessionId) {
    try {
      const findSession = await this.sessionsService.findOne(sessionId);

      if (!findSession) {
        this.logger.error('Session not found');
      }

      return this.sessionsService.update({
        ...findSession,
        started: true,
        isOpen: false,
      });
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
    const findSession = await this.sessionsService.findOne(sessionId);

    if (!findSession) {
      this.logger.error('Session not found');
    }

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
        findSession.category,
        _.uniq(genres).toString(),
        page,
      );

      // get movies from api based on genres from that session
      return { movies, update: true };
    }

    // not necessary to return movies because not all users have selected their movie genres
    return { movies: [], update: false };
  }

  // TODO: ADD RESTART VOTES EVENT

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

    const countedVotes = _.countBy(sessionVotes, 'movie_id');

    const formattedVotes = [];
    sessionVotes.forEach((vote) =>
      formattedVotes.push({
        movieId: vote.movie_id,
        votes: countedVotes[vote.movie_id],
      }),
    );

    // that means that all connected users have voted
    if (sessionVotes.length === sessionMembers.length) {
      return { votes: formattedVotes, update: true };
    }

    return { votes: formattedVotes, update: false };
  }

  async chosenMovie({ sessionId, votes }) {
    const votesMovieIds = votes.map((vote) => vote.movieId);

    const unformattedMovieId = _.head(
      _(votesMovieIds).countBy().entries().maxBy(_.last),
    );

    if (!unformattedMovieId) {
      this.logger.error('No votes');
    }

    const movieId = Number(unformattedMovieId);

    const session = await this.sessionsService.findOne(sessionId);

    // update session with chosen movie
    await this.sessionsService.update({ ...session, movie_id: movieId });
  }
}
