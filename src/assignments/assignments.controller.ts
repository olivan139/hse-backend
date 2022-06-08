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

    @Get('/details')
    getDetails(@Query('id') id : number) {
        return this.assignmentsService.getAssignmentDetailsById(id);
    }
    
    @Get()
    getAssignmentsList(@Query('page') page: number) {
        return this.assignmentsService.getAssignmentByPage(page);
    }
}
