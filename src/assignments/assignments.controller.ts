import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('assignments')
export class AssignmentsController {

    constructor(private assignmentsService: AssignmentsService) {}

    @Post()
    create(@Body() dto : CreateAssignmentDto) {
        return this.assignmentsService.createAssignment(dto);
    }

    @Get('/:value')
    getDetails(@Param() value : number) {
        return this.assignmentsService.getAssignmentDetailsById(value);
    }
    
    @Get()
    getAssignmentsList(@Query('page') page: number) {
        return this.assignmentsService.getAssignmentByPage(page);
    }
}
