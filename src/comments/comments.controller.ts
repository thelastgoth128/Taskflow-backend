import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto,@Req()request:Request) {
    return this.commentsService.create(createCommentDto,request);
  }

  @Get('all/:id')
  findAll(@Param('id',ParseIntPipe) id : number) {
    return this.commentsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto,@Req() request:Request) {
    return this.commentsService.update(+id, updateCommentDto,request);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number,@Req() request:Request) {
    return this.commentsService.remove(id,request);
  }
}
