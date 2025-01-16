import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateCommentDto {
    @IsInt()
    commentid : number

    @IsInt()
    taskid : number

    @IsInt()
    authorid : number

    @IsString()
    commenttext : string

    @IsDateString()
    createdat : Date
}
