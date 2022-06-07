import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Assignments } from './assignments.model';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
    constructor(@InjectModel(Assignments) private assignmentRepository: typeof Assignments) {}

    async createAssignment(dto : CreateAssignmentDto)
    {
        const assignment = await this.assignmentRepository.create(dto);
        return assignment;
    }

    async getAssignmentDetailsById(id : number) {
        const details = await this.assignmentRepository.findByPk(id);
        return details;
    }

    async getAssignmentByPage(page : number = 1) {
        const date = new Date();
        const newDate = new Date();

        const count  = await this.assignmentRepository.count({where : {deadlineTime :{[Op.gte] : date}}})

        date.setDate(date.getDate() + 7 * (page - 1));
        newDate.setDate(newDate.getDate() + 7 * page);
        const assignment = await this.assignmentRepository.findAll({
            attributes : ['deadlineType', 'subjectName', 'assigmentName', ' deadlineTime', 'sumbisionTIme'],
            where: {
                deadlineTime : { [Op.gte] : date,
                [Op.lt] : newDate}
            },
            order: [['deadlineTime', 'ASC']]
        })
        var result = assignment.reduce((acc, value) => {
            if (!acc[value.deadlineTime]) {
                acc[value.deadlineTime] = [];
            }
            acc[value.deadlineTime].push(value)
            return acc;
        }, {})

        return {
            "pageNum" : Math.ceil(count/7),
            "assignments" : result 
        }; 
    }
}
