import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
