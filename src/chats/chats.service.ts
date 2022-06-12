import { Injectable } from '@nestjs/common';
import { ChatMessageDto } from './dto/chat-message.dto';

@Injectable()
export class ChatsService {

    async createMessage(payload : ChatMessageDto) {

    }
}
