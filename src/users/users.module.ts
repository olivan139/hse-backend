import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignments } from 'src/assignments/assignments.model';
import { AuthModule } from 'src/auth/auth.module';
import { Chat } from 'src/chats/chats.model';
import { UserMessages } from 'src/chats/userMessages.model';
import { CourseMembers } from 'src/courses/course-members.model';
import { FilesModule } from 'src/files/files.module';
import { Group } from 'src/groups/groups.model';
import { GroupsModule } from 'src/groups/groups.module';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, Group, Chat, UserMessages, Assignments, CourseMembers]),
  RolesModule, forwardRef( () => AuthModule), FilesModule, GroupsModule],
  exports: [UsersService]
})
export class UsersModule {}
