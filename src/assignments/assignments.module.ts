import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from 'src/courses/courses.model';
import { CoursesModule } from 'src/courses/courses.module';
import { User } from 'src/users/users.model';
import { AssignmentsController } from './assignments.controller';
import { Assignments } from './assignments.model';
import { AssignmentsService } from './assignments.service';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  imports: [SequelizeModule.forFeature([Assignments, Course, User]), CoursesModule],
  exports: [AssignmentsService]
})
export class AssignmentsModule {}
