import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto,@Req() request: Request) {
    return this.tasksService.create(createTaskDto,request);
  }

  @Get('all')
  findAll(@Req() request:Request) {
    return this.tasksService.findAll(request);
  }

  @Get(':taskid')
  findOne(@Param('taskid',ParseIntPipe) taskid: number) {
    return this.tasksService.findOne(taskid);
  }

  @Patch(':taskid')
  update(@Param('taskid',ParseIntPipe) taskid: number, @Body() updateTaskDto: UpdateTaskDto,@Req() request:Request) {
    return this.tasksService.update(taskid, updateTaskDto,request);
  }

  @Delete(':taskid')
  remove(@Param('taskid',ParseIntPipe) taskid: number , @Req() request : Request) {
    return this.tasksService.remove(taskid, request );
  }
}
