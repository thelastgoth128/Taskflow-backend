import { IsBoolean, IsDateString, IsInt, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsInt()
    taskid : number

    @IsInt()
    assignedto : number

    @IsInt()
    assingedby : number

    @IsString()
    notificationtext : string

    @IsBoolean()
    isread : boolean

    @IsDateString()
    createdat : Date
}
