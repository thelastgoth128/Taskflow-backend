import { forwardRef, Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from './entities/team.entity';
import { UsersModule } from 'src/users/users.module';
import { TeammembersModule } from 'src/teammembers/teammembers.module';

@Module({
  imports :[
    TypeOrmModule.forFeature([Teams]),UsersModule,forwardRef(()=>TeammembersModule)
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports:[TypeOrmModule,TeamsService]
})
export class TeamsModule {}
