import { Tasks } from "src/tasks/entities/task.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    commentid : number

    @ManyToOne(()=>Tasks,task=>task.taskid)
    @JoinColumn({name : 'taskid'})
    taskid : number

    @ManyToOne(()=>Users,user=>user.author)
    @JoinColumn({name : 'authorid'})
    authorid : Users

    @Column()
    commenttext : string

    @Column({
        type : 'timestamp' , default : 'CURRENT_TIMESTAMP'
    })
    createdat : Date

}
