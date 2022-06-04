import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository : typeof Role, 
    @InjectModel(UserRoles) private userRolesRepository : typeof UserRoles) {

    }
    async createRole(dto : CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }
    async getRoleByValue(role : string) {
        const role_f = await this.roleRepository.findOne({where : {role}});
        return role_f;
    }

    async getRolesByUserId(idUser : number) {
        const userRoles = await this.userRolesRepository.findAll({where : {userId : idUser}})
        const arr = JSON.parse(JSON.stringify(userRoles));
        let roles = [];
        for (let i = 0; i < arr.length; i++)
        {
            roles.push(await this.roleRepository.findOne({where : {id : arr[i].roleId}}));
        }
        return roles;
    }
}
