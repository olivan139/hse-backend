import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes } from 'crypto';
import { where } from 'sequelize/types';
import { Assignments } from 'src/assignments/assignments.model';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CourseMembers } from './course-members.model';
import { Course } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course) private courseRepository: typeof Course,
    private userService : UsersService,
    @Inject(forwardRef(() => AssignmentsService)) private assignmentService : AssignmentsService) {}

    async createCourse(req : Request, dto : CreateCourseDto) {
        const user = await this.userService.getUserbyJWT(req);
        const course = await this.courseRepository.create(dto);
        await course.$set('owner', user.id)
        await course.$set('members', [user.id])
        const courseId = course.id;
        const code = randomBytes(2).toString('hex').toUpperCase();
        const result = await this.courseRepository.update({courseCode : code}, {where : {id : courseId}})
        course.courseCode = code;
        return course;
    }

    async getCourseById(courseId : number) {
        const course = await this.courseRepository.findOne({where : {id : courseId}})
        return course;
    }

    async addMember(req : Request, code : string) {
        code = code.toUpperCase()
        const user = await this.userService.getUserbyJWT(req);
        const course = await this.courseRepository.findOne({where : {courseCode : code}, include: {all: true}})
        const assignments = await this.assignmentService.getAssignmentsByCourseId(course.id)
        if (!course){
            throw new HttpException("no such course was found", HttpStatus.NOT_FOUND)
        }
        await course.$add('members', user.id)
        if (assignments.length == 0) {
            return course;
        }
        await user.$set('assignments', [assignments[0].id])
        for (var i = 1; i < assignments.length; i++) {
            await user.$add('assignments', assignments[i].id)
        }
        return course;
    }

    async getAllCourses() {
        const course = await this.courseRepository.findAll({include: {all: true}})
        return course;
    }

    async getAllAssignmentsToUser(req : any) {
        const user = await this.userService.getUserbyJWT(req);
        var assignmentsList;
        const courses = await this.courseRepository.findAll({
            attributes : ['id'],
            include : {
                model : CourseMembers,
                where : {
                    userId : user.id
                },
                attributes : []
            }
        })
        for (var i = 0; i < courses.length; i++)
        {
            assignmentsList += await this.courseRepository.findAll
        }
    }

    async getCourseMembers(courseId : number) {
        const members = await this.courseRepository.findAll({
            where: {
                id : courseId
            },
            attributes : [],
            include : {
                model : CourseMembers
            }
        })
        return members;
    }
}
