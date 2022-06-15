import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';

@Injectable()
export class GroupsService {
    constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

    async createGroup(groupName : string) {
        const group = await this.groupRepository.create(groupName);
        return group;
    }

    async getAllGroups() {
        const group = await this.groupRepository.findAll();
        return group;
    }

    async findGroupByName(name : string) {
        const group = await this.groupRepository.findOne({where : {groupName : name}})
        if (!group)
            throw new HttpException("invalid group name", HttpStatus.NOT_FOUND)
        return group;
    }
}
