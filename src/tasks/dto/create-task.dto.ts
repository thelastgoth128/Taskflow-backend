import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";



export class CreateTaskDto {

    @IsString()
    title : string

    @IsOptional()
    @IsString()
    description? : string

    @IsDateString()
    starttime : string

    @IsDateString()
    duedate : string

    @IsString()
    priority : 'Low' | 'Medium' | 'High'

    @IsString()
    status : 'To do' | 'In Progress' | 'Completed'

    @IsNumber()
    assignedto : number

    @IsNumber()
    createdby: number

    @IsDateString()
    createdat : string

    @IsDateString()
    updatedat : string
}
