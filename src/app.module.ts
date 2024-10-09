import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TeammembersModule } from './teammembers/teammembers.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './services/jwtMiddleware';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TasksModule, TeamsModule, CommentsModule, NotificationsModule, TeammembersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
