import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {

    constructor(private groupService : GroupsService) {}

    @Post()
    create(@Body() groupName : string) {
        return this.groupService.createGroup(groupName);
    }

    @Get()
    getAll() {
        return this.groupService.getAllGroups();
    }
}
