import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AssignmentsController } from './assignments.controller';
import { Assignments } from './assignments.model';
import { AssignmentsService } from './assignments.service';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  imports: [SequelizeModule.forFeature([Assignments])]
})
export class AssignmentsModule {}
