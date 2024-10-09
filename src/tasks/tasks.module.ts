import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { Tasks } from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports : [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Tasks]),UsersModule,forwardRef(()=>NotificationsModule)
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports : [TypeOrmModule]
})
export class TasksModule {}
