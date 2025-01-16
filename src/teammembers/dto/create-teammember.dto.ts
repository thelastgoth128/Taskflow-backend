import { IsInt } from "class-validator";

export class CreateTeammemberDto {
    @IsInt()
    teamid : number

    @IsInt()
    userid : number
}
