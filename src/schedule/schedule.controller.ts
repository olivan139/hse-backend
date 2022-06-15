import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {

    constructor(private scheduleService : ScheduleService) {}
    @Post()
    create(@Body() dto : CreateScheduleDto) {
        return this.scheduleService.createLesson(dto);
    }
    @Get()
    getForWeek(@Req() req : any, @Query('page') page: number) {
        const schedule = this.scheduleService.getSchedule(req, page);
        return schedule;
    }
    @Get('/all')
    getAllVal() {
        return this.scheduleService.getAll();
    }
}
