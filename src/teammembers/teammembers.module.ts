import { forwardRef, Module } from '@nestjs/common';
import { TeammembersService } from './teammembers.service';
import { TeammembersController } from './teammembers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
import { Teammembers } from './entities/teammember.entity';
import { UsersModule } from 'src/users/users.module';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Teammembers]),UsersModule,forwardRef(()=> TeamsModule)
  ],
  controllers: [TeammembersController],
  providers: [TeammembersService],
  exports:[TypeOrmModule,TeammembersService]
})
export class TeammembersModule {}
