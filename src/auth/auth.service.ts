import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { UserAuthDto } from 'src/users/dto/user-auth.dto';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {

    constructor(private userService : UsersService,
         private roleService : RolesService, 
         private jwtService : JwtService) {}

    async login(userDto : UserAuthDto) {
        const user = await this.validateUser(userDto);
        await this.userService.updateCurrRole(userDto.email, userDto.role)
        return (this.generateToken(user));
    }
    async registration(userDto : CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate){
            throw new HttpException('Пользователь c таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user : User){
        const payload = {email : user.email, id : user.id}
        return {
            token : this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: UserAuthDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        const roles = await this.roleService.getRolesByUserId(user.id);
        const isRole = roles.includes(userDto.role)
        if (user && passwordEquals && isRole) {
            return user;
        }
        throw new UnauthorizedException({message: 'Неверное имя пользователя или пароль или была выбрана не та роль.'})
    }
}