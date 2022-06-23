import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from 'src/courses/courses.model';
import { CoursesModule } from 'src/courses/courses.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { AssignmentsController } from './assignments.controller';
import { Assignments } from './assignments.model';
import { AssignmentsService } from './assignments.service';
import { UserAssignments } from './user-assignments.model';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  imports: [SequelizeModule.forFeature([Assignments, Course, User, UserAssignments]), forwardRef(()=> CoursesModule), UsersModule],
  exports: [AssignmentsService]
})
export class AssignmentsModule {}
