import { Type } from "class-transformer";
import { IsEmail, IsInt, IsOptional, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {

    @IsInt()
    userid : number

    @IsString()
    name : string

    @IsEmail()
    email : string

    @IsStrongPassword()
    password : string

    @IsOptional()
    @IsString()
    profilepicture : string

    @IsOptional()
    @Type(()=> Date)
    createdat : Date

    @IsOptional()
    @Type(()=>Date)
    updatedat : Date


}    