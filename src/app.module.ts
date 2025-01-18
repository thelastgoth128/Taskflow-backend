import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TeammembersModule } from './teammembers/teammembers.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './services/jwtMiddleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './users/entities/users.entity';
import { Tasks } from './tasks/entities/task.entity';
import { Teams } from './teams/entities/team.entity';
import { Comments } from './comments/entities/comment.entity';
import { Notifications } from './notifications/entities/notification.entity';
import { Teammembers } from './teammembers/entities/teammember.entity';

@Module({
  imports: [UsersModule, TasksModule, TeamsModule, CommentsModule, NotificationsModule, TeammembersModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService : ConfigService) => ({
        type:'postgres',
        url:configService.get<string>('DATABASE_URL'),
        entities:[Users,Tasks,Teams,Comments,Notifications,Teammembers,],
        synchronize:false,
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
