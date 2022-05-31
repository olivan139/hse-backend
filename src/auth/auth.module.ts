import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn : '24h'
    }
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
