import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { Notifications } from './entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports:[
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Notifications]),UsersModule,forwardRef(()=>TasksModule)
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports : [TypeOrmModule,NotificationsService]
})
export class NotificationsModule {}
