import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.model';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel(Schedule) private scheduleRepository: typeof Schedule) {}

    async createLesson(dto : CreateScheduleDto) {
        const schedule = await this.scheduleRepository.create(dto);
        return schedule;
    }

    async getSchedule(page : number = 1) {
        const schedule = await this.scheduleRepository.findAndCountAll({
            where: {
                dayDate : { [Op.gte] : new Date()}
            },
            limit : 7,
            offset : 7 * (page - 1),
            order: [['time', 'ASC']]
        })
        return schedule;
    }
    async getAll() {
        const schedule = await this.scheduleRepository.findAll();
        return schedule;
    }
}
