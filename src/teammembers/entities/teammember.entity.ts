import { Teams } from "src/teams/entities/team.entity";
import { Users } from "src/users/entities/users.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teammembers {
    @PrimaryGeneratedColumn()
    member : number

    @ManyToOne(()=>Teams, team=>team.teammembers)
    @JoinColumn({name : 'teamid'})
    teamid : number

    @ManyToOne(()=>Users, user=>user.teammember)
    @JoinColumn({name : 'userid'})
    userid : number


}
