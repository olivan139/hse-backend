import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserAuthDto } from 'src/users/dto/user-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}
    @Post('/login')
    login(@Body() userDto : UserAuthDto) {
        return this.authService.login(userDto)
    }
    @Post('/registration')
    registration(@Body() userDto : CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
