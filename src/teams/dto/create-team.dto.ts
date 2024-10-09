import { IsDate, IsDateString, IsInt, IsString } from "class-validator";


export class CreateTeamDto {
    @IsInt()
    teamid : number

    @IsString()
    teamaname: string

    @IsInt()
    teamleader : number

    @IsDateString()
    createdat : Date

    @IsDateString()
    updatedat : Date


}
