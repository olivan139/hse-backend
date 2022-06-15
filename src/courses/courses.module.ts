import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './courses.model';
import { CourseMembers } from './course-members.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Assignments } from 'src/assignments/assignments.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [SequelizeModule.forFeature([User, Course, CourseMembers, Assignments]), UsersModule],
  exports: [CoursesService]
})
export class CoursesModule {}
