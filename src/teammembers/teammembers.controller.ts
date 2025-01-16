import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TeammembersService } from './teammembers.service';
import { CreateTeammemberDto } from './dto/create-teammember.dto';
import { UpdateTeammemberDto } from './dto/update-teammember.dto';
import { Request } from 'express';

@Controller('teammembers')
export class TeammembersController {
  constructor(private readonly teammembersService: TeammembersService) {}

  @Post('create')
  create(@Body() createTeammemberDto: CreateTeammemberDto,@Req() request:Request) {
    return this.teammembersService.create(createTeammemberDto,request);
  }

  @Get('all')
  findAll() {
    return this.teammembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teammembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeammemberDto: UpdateTeammemberDto) {
    return this.teammembersService.update(+id, updateTeammemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teammembersService.remove(+id);
  }
}
