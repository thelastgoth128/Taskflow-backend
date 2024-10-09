import {  Comments } from "src/comments/entities/comment.entity";
import { Tasks } from "src/tasks/entities/task.entity";
import { Teammembers } from "src/teammembers/entities/teammember.entity";
import { Teams } from "src/teams/entities/team.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    userid: number

    @Column()
    name : string

    
    @Column({
        unique: true
    })
    email: string

    @Column()
    password : string

    @Column()
    profilepicture : string

    @Column({
        type: 'timestamp', default : () => 'CURRENT_TIMESTAMP'
    })
    createdat : Date

    @Column({
        type: 'timestamp',default : () => 'CURRENT_TIMESTAMP'
    })
    updatedat : Date

    @OneToMany(()=>Tasks,task => task.createdby)
    createdTasks: Tasks[];

    @OneToMany(()=> Tasks,task => task.assignedto)
    assignedTasks: Tasks[]

    @OneToMany(() => Teams, team => team.teamleader)
    @JoinColumn({name : 'team'})
    team: Teams[]

    @OneToMany(()=>Teammembers, teammember=>teammember.userid)
    @JoinColumn({name : 'teammeber'})
    teammember : Teammembers[]

    @OneToMany(()=>Comments,comment=>comment.authorid)
    @JoinColumn({name : 'author'})
    author : Comments[]


}
