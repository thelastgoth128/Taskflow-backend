import { Comments } from "src/comments/entities/comment.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    taskid : number

    @Column()
    title : string

    @Column({
        type : 'text', nullable: true
    })
    description : string

    @Column({
        type: 'timestamp'
    })
    starttime : Date

    @Column({
        type : 'timestamp'
    })
    duedate: Date

    @Column()
    priority: 'Low' | 'Medium' | 'High'
    
    @Column()
    status : 'To do' | 'In Progress' | 'Completed'

    
    @ManyToOne(()=>Users,user=>user.createdTasks)
    @JoinColumn({name: 'createdby'})
    createdby: Users

    @ManyToOne(()=>Users,user => user.assignedTasks)
    @JoinColumn({name: 'assignedto'})
    assignedto: Users


    @Column({
        type: 'timestamp', default :()=> 'CURRENT_TIMESTAMP',update:false
    })
    createdat : Date

    
    @Column({
        type: 'timestamp', default :()=> 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'
    })
    updatedat : Date

    @OneToMany(()=>Comments, comment=>comment.taskid)
    @JoinColumn({name : 'taskId'})
    taskId : Comments
}
