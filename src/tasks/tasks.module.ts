import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Tasks]),UsersModule,NotificationsModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports : [TypeOrmModule]
})
export class TasksModule {}
