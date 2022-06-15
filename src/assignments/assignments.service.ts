import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Assignments } from './assignments.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { GiveGradeDto } from './dto/give-grade.dto';

@Injectable()
export class AssignmentsService {
    constructor(@InjectModel(Assignments) private assignmentRepository: typeof Assignments,
    private courseService : CoursesService) {}

    async createAssignment(dto : CreateAssignmentDto)
    {
        const courseId = dto.courseId
        delete dto.courseId;
        const assignment = await this.assignmentRepository.create(dto);
        const course = await this.courseService.getCourseById(courseId);
        assignment.$set('course', course.id);
        assignment.course = course;
        return assignment;
    }

    async getAssignmentDetailsById(assId : number) {
        const details = await this.assignmentRepository.findOne({where : {id : assId}});
        return details;
    }

    async getAssignmentByPage(courseId : number, page : number = 1) {
        const date = new Date();
        const newDate = new Date();
        const currCourse = await this.courseService.getCourseById(courseId);
        const count  = await this.assignmentRepository.count({where : {course : currCourse,deadlineTime :{[Op.gte] : date}}})

        date.setDate(date.getDate() + 7 * (page - 1));
        newDate.setDate(newDate.getDate() + 7 * page);
        const assignment = await this.assignmentRepository.findAll({
            attributes : ['id', 'deadlineType', 'assignmentName', 'deadlineTime', 'courseName', 'submissionTime'],
            where: {
                deadlineTime : { [Op.gte] : date,
                [Op.lt] : newDate}
            },
            order: [['deadlineTime', 'ASC']]
        })
        var result = assignment.reduce((acc, value) => {
            var date = new Date(value.deadlineTime)
            console.log(date.getDate())
            if (!acc[String(date.getFullYear()) + '-' + String('0' + (date.getMonth() + 1)).slice(-2) + '-' + String('0' + date.getDate()).slice(-2)]) {
                acc[String(date.getFullYear()) + '-' + String('0' + (date.getMonth() + 1)).slice(-2) + '-' + String('0' + date.getDate()).slice(-2)] = [];
            }
            acc[String(date.getFullYear()) + '-' + String('0' + (date.getMonth() + 1)).slice(-2) + '-' + String('0' + date.getDate()).slice(-2)].push(value)
            return acc;
        }, {})

        return {
            "pageNum" : Math.ceil(count/7),
            "assignments" : result 
        }; 
    }
    async giveScore(dto : GiveGradeDto) {
        const updated = await this.assignmentRepository.update(
            {
                grade : dto.grade
            }, 
            {
                where: {id : dto.id}
            }
        )
        return updated;
    }
}
