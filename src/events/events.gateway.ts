import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { EventTypes } from './enums/EventTypes';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(EventTypes.JOIN_SESSION_EVENT)
  onEvent(client: any, data: any): WsResponse<string> {
    return {
      event: EventTypes.JOIN_SESSION_EVENT,
      data: "You've joined the session!",
    };
  }
}
