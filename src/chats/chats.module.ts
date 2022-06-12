import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { ChatsController } from './chats.controller';
import { Chat } from './chats.model';
import { ChatsService } from './chats.service';
import { UserMessages } from './userMessages.model';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [SequelizeModule.forFeature([User, Chat, UserMessages])],
  exports: [ChatsService]
})
export class ChatsModule {}
