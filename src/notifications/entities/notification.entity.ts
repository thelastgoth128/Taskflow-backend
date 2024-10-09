import { Tasks } from "src/tasks/entities/task.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notifications {
    @PrimaryGeneratedColumn()
    notificationid : number

    @ManyToOne(()=>Users,user=>user.userid)
    @JoinColumn({name : 'assignedto'})
    assignedto : Users

    @ManyToOne(()=>Users,user=>user.userid)
    @JoinColumn({name : 'assignedby'})
    assignedby : number

    @ManyToOne(()=>Tasks,tasks=>tasks.taskid)
    @JoinColumn({name : 'taskid'})
    taskid : Tasks

    @Column()
    notificationtext : string

    @Column()
    isread : boolean 

    @Column({
        type: 'timestamp' , default : 'CURRENT_TIMESTAMP'
    })
    createdat : Date
}
