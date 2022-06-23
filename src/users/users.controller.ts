import { Body, Controller, Get, Post, Req, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddGroupDto } from './dto/add-group.dto';
import { addRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto : CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    // @Roles('STUDENT')
    // @UseGuards(RolesGuard)   
    @Post('/role')
    addRole(@Body() dto : addRoleDto) {
        return this.usersService.addRole(dto)
    }
    @Get('/profile')
    getUser(@Req() req : Request) {
        return this.usersService.getUserbyJWT(req)
    }
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('image'))
    addAvatar(@Req() req : Request, @UploadedFile() image : any) {
       return this.usersService.addUserAvatar(req, image);
    }
    @Get('/avatar')
    getImageURL(@Req() req : Request) {
        return this.usersService.getUserImgURL(req);
    }
    @Post('group')
    addGroup(@Req() req : Request, @Body() dto : AddGroupDto) {
        return this.usersService.addGroup(req, dto);
    }
    @Get('/courses')
    getCourses(@Req() req : Request) {
        return this.usersService.getCourses(req);
    }

    @Get('/assignments')
    getAss(@Req() req : Request) {
        return this.usersService.getAssignments(req);
    }
}
