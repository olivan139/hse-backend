import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Assignments } from './assignments.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { GiveGradeDto } from './dto/give-grade.dto';

@Injectable()
export class AssignmentsService {
    constructor(@InjectModel(Assignments) private assignmentRepository: typeof Assignments) {}

    async createAssignment(dto : CreateAssignmentDto)
    {
        const assignment = await this.assignmentRepository.create(dto);
        return assignment;
    }

    async getAssignmentDetailsById(assId : number) {
        const details = await this.assignmentRepository.findOne({where : {id : assId}});
        return details;
    }

    async getAssignmentByPage(page : number = 1) {
        const date = new Date();
        const newDate = new Date();

        const count  = await this.assignmentRepository.count({where : {deadlineTime :{[Op.gte] : date}}})

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
