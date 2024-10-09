import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Comments } from "src/comments/entities/comment.entity";
import { Notifications } from "src/notifications/entities/notification.entity";
import { Tasks } from "src/tasks/entities/task.entity";
import { Teammembers } from "src/teammembers/entities/teammember.entity";
import { Teams } from "src/teams/entities/team.entity";
import { Users } from "src/users/entities/users.entity";



export const typeOrmConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'thelastgoth128',
    database : 'taskflow',
    entities : [Users,Tasks,Teams,Teammembers,Notifications,Comments],
    synchronize: false
}