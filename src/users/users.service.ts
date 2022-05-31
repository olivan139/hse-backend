import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private rolesService : RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('STUDENT');
        await user.$set('roles', [role.id])
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }
    async addRole(dto : addRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.role);
        if (role && user) {
            user.$add('role', role.id)
            return dto;
        }
        throw new HttpException("user or role has not been found", HttpStatus.NOT_FOUND)

    }
  }