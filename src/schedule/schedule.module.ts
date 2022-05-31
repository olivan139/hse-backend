import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';

@Module({
  controllers : [ScheduleController],
  providers: [ScheduleService],
  imports: [SequelizeModule.forFeature([Schedule])]
})
export class ScheduleModule {}
