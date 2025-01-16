import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

@Module({
  imports:[
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule,UsersService]
})
export class UsersModule {}
