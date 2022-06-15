import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'src/groups/groups.model';
import { UsersModule } from 'src/users/users.module';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';

@Module({
  controllers : [ScheduleController],
  providers: [ScheduleService],
  imports: [SequelizeModule.forFeature([Schedule, Group]), UsersModule],
  exports: [ScheduleService]
})
export class ScheduleModule {}
