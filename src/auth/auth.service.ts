import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { profile } from 'console';
import { PassThrough } from 'stream';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService,
    ){}

    async signIn(email : string, pass:string,@Res({passthrough:true}) response:Response ){
        const user = await this.userService.finds(email)
        if(!user){
            throw new BadRequestException('wrong email')
        }
        if(!await bcrypt.compare(pass,user.password)){
            throw new BadRequestException('wrong credentials')
        }        
        const payload ={userid: user.userid, email: user.email, name:user.name, profile: user.profilepicture}
           const jwt= await this.jwtService.signAsync(payload)
           response.cookie('jwt',jwt, { httpOnly:true,secure:true,maxAge:3600000 })

           return {
            message : "success"
           }
            
    }
}
