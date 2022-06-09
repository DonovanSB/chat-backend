import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<unknown>> {
    const { user, room, message } = data;
    if (user && room && message) {
      const messageDB = await this.messagesService.create(data);
      this.server.emit('message', messageDB);
    }
    return;
  }
}
