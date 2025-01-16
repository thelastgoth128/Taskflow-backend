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

    @Column()
    notificationtext : string

    @Column()
    isread : boolean 

    @Column({
        type: 'timestamp' , default :()=> 'CURRENT_TIMESTAMP',update:false
    })
    createdat : Date
}
