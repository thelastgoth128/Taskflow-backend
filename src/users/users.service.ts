import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(Users)
      private readonly users : Repository<Users>,
      private jwtService: JwtService
    ){}


  async create(createUserDto : CreateUserDto,@Res({passthrough:true}) response:Response) {
    const { email } = createUserDto;

    const already  = await this.users.findOne({where : {email}})
    if(already){
      throw new NotFoundException('email already exist,login')
    }

    const user = await this.users.save(createUserDto)

    const payload = {userid: user.userid, email: user.email, name:user.name, profile: user.profilepicture}
    const jwt = await this.jwtService.signAsync(payload)
    response.cookie('jwt',jwt,{
      httpOnly:false,
      secure:false,
      maxAge:3600000,
    })
    
     return {user,
      message: 'success'
     }
  }

  async findAll() {
    return await this.users.find();
  }

  async finds(email : string):Promise<Users | undefined>{
    return await this.users.findOne({where : { email }})
  }

  async findOne(userid: number) {
    return await this.users.findOne({where : { userid }})
  }

  async update(userid: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userid);
    if(!user){
      throw NotFoundError
    }
    Object.assign(user, updateUserDto)
    return await this.users.save(user)
  }

 async remove(userid: number,@Req() req:Request) {
    await this.users.delete(userid)
    const user =  req.user?.userid
    return  user
  }
}
