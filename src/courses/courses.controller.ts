import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
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

    @Get('/course')
    getCoursesId(@Req() req : any, @Query('id') id: number) {
        return this.courseService.getCourseById(id);
    }




}
