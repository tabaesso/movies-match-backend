import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { EventTypes } from './enums/EventTypes';
import { Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { getWSParams } from 'src/utils/getWSParams';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, message: any) {
    const sessionId = getWSParams(message.url, 0);
    const userId = getWSParams(message.url, 1);

    client.sessionId = sessionId;

    this.logger.debug(
      `Client connected: Session ${client.sessionId} - User ${userId}`,
    );

    await this.eventsService.joinSession({ sessionId, userId });
  }

  sendUpdateToClients(sessionId: string, updateData: any) {
    this.server.clients.forEach((client) => {
      const clientSessionId = client.sessionId;
      if (clientSessionId === sessionId) {
        client.send(JSON.stringify(updateData));
      }
    });
  }

  @SubscribeMessage(EventTypes.SORT_MOVIES_EVENT)
  async onSort(client: any, data: any): Promise<WsResponse<any>> {
    const { sessionId, genres } = data;

    await this.eventsService.addSessionGenres({
      sessionId,
      genres,
    });

    const { movies, update } = await this.eventsService.sortMoviesByGenres({
      sessionId,
    });

    if (update) {
      this.sendUpdateToClients(sessionId, {
        event: EventTypes.SORT_MOVIES_EVENT,
        data: movies,
      });

      return;
    }

    return {
      event: EventTypes.SORT_MOVIES_EVENT,
      data: movies,
    };
  }

  @SubscribeMessage(EventTypes.VOTED_MOVIE_EVENT)
  async onVote(client: any, data: any): Promise<WsResponse<any>> {
    const { sessionId, movieId } = data;

    await this.eventsService.addSessionVote({ sessionId, movieId });

    const { votes, update } = await this.eventsService.getVotes({ sessionId });

    if (update) {
      this.sendUpdateToClients(sessionId, {
        event: EventTypes.VOTED_MOVIE_EVENT,
        data: votes,
      });

      return;
    }

    return {
      event: EventTypes.VOTED_MOVIE_EVENT,
      data: votes,
    };
  }

  @SubscribeMessage(EventTypes.CHOSEN_MOVIE_EVENT)
  async onChosen(client: any, data: any): Promise<void> {
    const { sessionId, movieId } = data;

    const movie = await this.eventsService.chosenMovie({
      sessionId,
      movieId,
    });

    return this.sendUpdateToClients(sessionId, {
      event: EventTypes.CHOSEN_MOVIE_EVENT,
      data: movie,
    });
  }
}