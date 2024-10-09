import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Request } from 'express';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create')
  create(@Body() createTeamDto: CreateTeamDto,@Req() request:Request) {
    return this.teamsService.create(createTeamDto,request);
  }

  @Get('all')
  findAll(@Req() request:Request) {
    return this.teamsService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTeamDto: UpdateTeamDto,@Req() request:Request) {
    return this.teamsService.update(id, updateTeamDto,request);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number,@Req() request:Request) {
    return this.teamsService.remove(id,request);
  }
}
