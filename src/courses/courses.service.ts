import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes } from 'crypto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Course } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course) private courseRepository: typeof Course,
    private userService : UsersService) {}

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

        if (!course){
            throw new HttpException("no such course was found", HttpStatus.NOT_FOUND)
        }
        await course.$add('members', user.id)
        return course;
    }

    async getAllCourses() {
        const course = await this.courseRepository.findAll({include: {all: true}})
        return course;
    }
}
