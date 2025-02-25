import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Public } from 'src/auth/public';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto,@Res({passthrough:true}) response:Response) {
    const hash = await bcrypt.hash(createUserDto.password, 12)
    createUserDto.password = hash
    return await this.usersService.create(createUserDto,response);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  find(@Param('email') email:string){
    return this.usersService.finds(email)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string,@Req() request:Request) {
    return this.usersService.remove(+id,request);
  }
}
