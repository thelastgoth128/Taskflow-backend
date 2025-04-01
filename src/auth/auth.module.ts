import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService)=> ({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,{
    provide:APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AuthModule {}
