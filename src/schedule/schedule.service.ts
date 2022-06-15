import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import _ from 'lodash';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.model';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    private userService : UsersService) {}

    async createLesson(dto : CreateScheduleDto) {
        const schedule = await this.scheduleRepository.create(dto);
        return schedule;
    }

    async getSchedule(req : Request, page : number = 1) {
        const user = await this.userService.getUserbyJWT(req);
        const date = new Date();
        const newDate = new Date();

        const count  = await this.scheduleRepository.count({where : {dayDate :{[Op.gte] : date},
                                                                    groupId : user.groupId}})

        date.setDate(date.getDate() + 7 * (page - 1));
        newDate.setDate(newDate.getDate() + 7 * page);
        const schedule = await this.scheduleRepository.findAll({
            where: {
                dayDate : { [Op.gte] : date,
                [Op.lt] : newDate},
                groupId : user.groupId
            },
            order: [['dayDate', 'ASC'],  ['timeStart', 'ASC']]
        })
        var result = schedule.reduce((acc, value) => {
            if (!acc[value.dayDate]) {
                acc[value.dayDate] = [];
            }
            acc[value.dayDate].push(value)
            return acc;
        }, {})

        return {
            "pageNum" : Math.ceil(count/7),
            "timeTable" : result 
        }; 
    }
    async getAll() {
        const schedule = await this.scheduleRepository.findAll();
        return schedule;
    }
}
