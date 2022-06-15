import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from 'src/files/files.service';
import { GroupsService } from 'src/groups/groups.service';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private rolesService : RolesService, 
    private jwtService : JwtService,
    private filesService : FilesService,
    private groupService : GroupsService ) {}

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
    async getUserbyJWT(req : Request) {
        let token = String(req.headers["authorization"]).split(' ')[1]
        if (!token)
            throw new HttpException('Пользователь не авторизован', HttpStatus.FORBIDDEN)
        const userId = Number(this.jwtService.decode(token)['id']);
        const user = await this.userRepository.findOne({where: {id : userId}, attributes: {exclude : ['password']}
        });
        return user;
    }
    async getUserIdByJWT(req : Request) {
        let token = String(req.headers["authorization"]).split(' ')[1]
        if (!token)
            throw new HttpException('Пользователь не авторизован', HttpStatus.FORBIDDEN)
        const userId = Number(this.jwtService.decode(token)['id']);
        return userId;
    }

    async addUserAvatar(req : Request, image : any) {
        const userId = await this.getUserIdByJWT(req);
        const avatar = await this.filesService.createFile(image);
        const updateAvatar = await this.userRepository.update(
            {
                pic : avatar
            },
            {
                where : {
                    id : userId
                }
            }
        ) 
        return updateAvatar;
  }
  async getUserImgURL(req :Request) {
      const userId = await this.getUserIdByJWT(req);
      const imgURL = await this.userRepository.findOne({
          where: {id : userId},
          attributes : ['pic']
      })
      return imgURL;
  }

  async addGroup(req : Request, groupName : string) {
      const user = await this.getUserbyJWT(req);
      const group = await this.groupService.findGroupByName(groupName);
      user.$set('groupId', group.id)
      user.groupId = group.id;
      return user;
  }
}