import { Tasks } from "src/tasks/entities/task.entity";
import { Teammembers } from "src/teammembers/entities/teammember.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teams {
    @PrimaryGeneratedColumn()
    teamid : number

    @Column()
    teamname : string

    @ManyToOne(()=>Users, user=> user.team)
    @JoinColumn({name: 'teamleader'})
    teamleader : Users

    @Column({
        type: 'timestamp' , default :() => 'CURRENT_TIMESTAMP',update:false
    })
    createdat : Date

    @Column({
        type : 'timestamp' , default : () => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'
    })
    updatedat : Date

    @OneToMany(()=>Teammembers,teammber=>teammber.teamid)
    @JoinColumn({name : 'team'})
    teammembers : Teammembers[]

    @OneToMany(()=>Tasks,task=>task.taskid)
    tasks : Teams
}
