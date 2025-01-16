import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './public';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('login')
    signIn(@Body() signInDto:Record<string,any>,@Res({passthrough:true})response:Response){
       return this.authService.signIn(signInDto.email,signInDto.password,response) 
    }
}
