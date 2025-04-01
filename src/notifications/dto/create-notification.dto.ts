import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsInt()
    assignedto : number

    @IsInt()
    assingedby : number

    @IsOptional()
    @IsString()
    notificationtext : string

    @IsBoolean()
    isread : boolean

    @IsDateString()
    createdat : Date
}
