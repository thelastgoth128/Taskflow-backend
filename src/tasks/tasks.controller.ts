import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { Public } from 'src/auth/public';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto,@Req() request: Request) {
    return this.tasksService.create(createTaskDto,request);
  }

  @Get('all')
  findAll() {
    return this.tasksService.findAll();
  }

  
  @Get('user/all')
  findUserTasks(@Req() request:Request) {
    return this.tasksService.findUserTasks(request)
  }


  @Get(':taskid')
  findOne(@Param('taskid') taskid: number) {
    return this.tasksService.findOne(+taskid);
  }

  @Patch(':taskid')
  update(@Param('taskid') taskid: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+taskid, updateTaskDto);
  }

  @Delete(':taskid')
  remove(@Param('taskid') taskid: number) {
    return this.tasksService.remove(+taskid);
  }
}
