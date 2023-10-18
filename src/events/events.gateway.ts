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

@WebSocketGateway(8080)
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, message: any) {
    const sessionId = getWSParams(message.url, 0);
    const userId = getWSParams(message.url, 1);

    client.sessionId = sessionId;
    client.userId = userId;

    this.logger.debug(
      `Client connected: Session ${client.sessionId} - User ${client.userId}`,
    );

    this.eventsService
      .joinSession({
        sessionId,
        userId,
      })
      .then((userMember) => {
        this.sendUpdateToClients(sessionId, {
          event: EventTypes.JOIN_SESSION,
          data: userMember,
        });
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  // note: websocket don't call async methods to disconnect so I'm using then/catch
  handleDisconnect(client: any) {
    const { sessionId, userId } = client;

    this.eventsService
      .disconnectMemberFromSession({ sessionId, userId })
      .then(() => {
        this.logger.debug(`Client disconnected: ${userId}`);
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  sendUpdateToClients(sessionId: string, updateData: any) {
    this.server.clients.forEach((client: any) => {
      const clientSessionId = client.sessionId;
      if (clientSessionId === sessionId) {
        client.send(JSON.stringify(updateData));
      }
    });
  }

  @SubscribeMessage(EventTypes.START_SESSION)
  async startSession(client: any, data: any): Promise<void> {
    const { sessionId } = data;

    const session = await this.eventsService.startSession(sessionId);

    this.sendUpdateToClients(sessionId, {
      event: EventTypes.START_SESSION,
      data: session,
    });
  }

  @SubscribeMessage(EventTypes.SORT_MOVIES_EVENT)
  async onSort(client: any, data: any): Promise<WsResponse<any>> {
    const { sessionId, genres, page } = data;

    await this.eventsService.addSessionGenres({
      sessionId,
      genres,
    });

    const { movies, update } = await this.eventsService.sortMoviesByGenres({
      sessionId,
      page,
    });

    if (update) {
      this.sendUpdateToClients(sessionId, {
        event: EventTypes.SORT_MOVIES_EVENT,
        data: movies,
      });

      return;
    }
  }

  @SubscribeMessage(EventTypes.VOTED_MOVIE_EVENT)
  async onVote(client: any, data: any): Promise<WsResponse<any>> {
    const { sessionId, movieId } = data;

    await this.eventsService.addSessionVote({ sessionId, movieId });

    const { votes, update } = await this.eventsService.getVotes({ sessionId });

    if (update) {
      await this.eventsService.chosenMovie({
        sessionId,
        votes,
      });

      this.sendUpdateToClients(sessionId, {
        event: EventTypes.CHOSEN_MOVIE_EVENT,
        data: true,
      });

      return;
    }

    this.sendUpdateToClients(sessionId, {
      event: EventTypes.VOTED_MOVIE_EVENT,
      data: votes,
    });
  }
}
