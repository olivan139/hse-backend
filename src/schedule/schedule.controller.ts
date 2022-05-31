import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {

    constructor(private scheduleService : ScheduleService) {}
    @Post()
    async create(@Body() dto : CreateScheduleDto) {
        return this.scheduleService.createLesson(dto);
    }
    @Get()
    async getForWeek(@Query('page') page: number) {
        const schedule = await this.scheduleService.getSchedule(page);
        return schedule;
    }
    @Get('/all')
    async getAllVal() {
        return this.scheduleService.getAll();
    }
}
