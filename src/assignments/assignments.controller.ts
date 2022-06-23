import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { GetAssignmentDto } from './dto/get-assignment.dto';
import { GiveGradeDto } from './dto/give-grade.dto';

@Controller('assignments')
export class AssignmentsController {

    constructor(private assignmentsService: AssignmentsService) {}

    @Post()
    create(@Req() req : any, @Body() dto : CreateAssignmentDto) {
        return this.assignmentsService.createAssignment(req, dto);
    }

    @Get('/details')
    getDetails(@Query('id') id : number) {
        return this.assignmentsService.getAssignmentDetailsById(id);
    }
    
    @Get('/assignment-list')
    getAssignmentsList(@Query('id') id: number) {
        return this.assignmentsService.getAssignmentByPage(id);
    }

    // @Post('/grade')
    // postGrade(@Body() dto : GiveGradeDto) {
    //     return this.assignmentsService.giveScore(dto);
    // }
}
