import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Course } from 'src/courses/courses.model';
import { CoursesService } from 'src/courses/courses.service';
import { Assignments } from './assignments.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { GetAssignmentDto } from './dto/get-assignment.dto';
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

    async getAssignmentByPage(courseId : number = 1) {
        const date = new Date();
        const count  = await this.assignmentRepository.count({
            include : {
                model : Course,
                attributes : [],
                where : {
                   id : courseId
                }
            },
            where : {
                deadlineTime :{
                    [Op.gte] : date}
                }
                })

        const assignment = await this.assignmentRepository.findAll({
            attributes : ['id', 'deadlineType', 'assignmentName', 'deadlineTime', 'submissionTime'],
            include : {
                model : Course,
                attributes : [],
                where : {
                   id : courseId
                }
            },
            order: [['deadlineTime', 'ASC']]
        })

        return {
            "numOfElements" : count,
            "assignments" : assignment 
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
