import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';


@Controller('courses')
export class CoursesController {

    constructor(private courseService : CoursesService) {}
    
    @Post()
    createNew(@Body() dto : CreateCourseDto, @Req() req : any)
    {
        return this.courseService.createCourse(req, dto);
    }

    @Get()
    getAll() {
        return this.courseService.getAllCourses();
    }


}
