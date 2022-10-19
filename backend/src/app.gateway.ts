import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'Socket.IO';
import { MessageUpdatePayload } from 'types';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  serveClient: false,
  namespace: 'chat',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly appService: AppService) {}

  @WebSocketServer() server: Server;

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('messages:get')
  async handleMessagesGet(): Promise<void> {
    const messages = await this.appService.getMessages();
    this.server.emit('messages', messages);
  }

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('messages:clear')
  async handleMessagesClear(): Promise<void> {
    await this.appService.clearMessages();
  }

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: // { userId: string, text: string }
    Prisma.MessageCreateInput,
  ): Promise<void> {
    const createdMessage = await this.appService.createMessage(payload);
    this.server.emit('message:post', createdMessage);
    this.handleMessagesGet();
  }

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('message:put')
  async handleMessagePut(
    @MessageBody()
    payload: // { id: number, text: string }
    MessageUpdatePayload,
  ): Promise<void> {
    const updatedMessage = await this.appService.updateMessage(payload);
    this.server.emit('message:put', updatedMessage);
    this.handleMessagesGet();
  }

  //@UseGuards(JwtAuthGuard)
  @SubscribeMessage('message:delete')
  async handleMessageDelete(
    @MessageBody()
    payload: // { id: number }
    Prisma.MessageWhereUniqueInput,
  ) {
    const removedMessage = await this.appService.removeMessage(payload);
    this.server.emit('message:delete', removedMessage);
    this.handleMessagesGet();
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client);
    console.log(client.handshake.query);
    const email = client.handshake.query.email as string;
    const socketId = client.id;
    users[socketId] = email;

    client.broadcast.emit('log', `${email} connected`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const email = users[socketId];
    delete users[socketId];

    client.broadcast.emit('log', `${email} disconnected`);
  }
}
