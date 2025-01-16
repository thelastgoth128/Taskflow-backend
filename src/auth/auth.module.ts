import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authGuard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{ expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,{
    provide:APP_GUARD,
    useClass: AuthGuard
  }]
})
export class AuthModule {}
