import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto,@Req() request:Request) {
    return this.teamsService.update(+id, updateTeamDto,request);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() request:Request) {
    return this.teamsService.remove(+id,request);
  }
}
