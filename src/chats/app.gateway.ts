import { SubscribeMessage, WebSocketGateway, OnGatewayInit, 
  WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { Chat } from './chats.model';
import { ChatsService } from './chats.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
 })
 
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatsService) {}
 
  @WebSocketServer() server: Server;
 
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: ChatMessageDto): Promise<void> {
    await this.chatService.createMessage(payload);
  this.server.emit('recMessage', payload);
  }
 
  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }
 
  handleDisconnect(client: Socket) {
    //Do stuffs
  }
 
  handleConnection(client: Socket, ...args: any[]) {
    //Do stuffs
  }
}

