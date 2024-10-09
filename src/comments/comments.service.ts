import { ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comment.entity';
import { In, Repository } from 'typeorm';
import { Tasks } from 'src/tasks/entities/task.entity';
import { Users } from 'src/users/entities/users.entity';
import { Request } from 'express';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comments)
    private readonly commentrep : Repository<Comments>,
    @InjectRepository(Tasks)
    private readonly task : Repository<Tasks>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>
  ){}

  async create(createCommentDto: CreateCommentDto,@Req() req:Request) {
    const {taskid, ...commentData} = createCommentDto
    const authorid = req.user.userid
    
    const task = await this.task.findOne({where : { taskid }})
    const user = await this.userrep.findOne({where : {userid : authorid}})
    
    if(!task){
      throw new NotFoundException('task does not exist')
    }
    if(!user){
      throw new NotFoundException('user not found')
    }

    const comment =  this.commentrep.create({
      ...commentData,
      authorid : user,
      taskid : task.taskid
    })
    await this.commentrep.save(comment)
    return {
      message :"Succesfully created a comment"
    }
  }

  async findAll(taskid : number) {
    const task = await this.task.find({where : {taskid}})
    const author = await this.commentrep.find({where : {taskid},relations : ['taskid','authorid']})
    
    if (task.length === 0){
      throw new NotFoundException('Task not found')
    }
    if(author.length === 0){
      throw new ForbiddenException('No comments found')
    }
    return author;
  }

  async findOne(taskid: number) {
    return await this.commentrep.findOne({where : { taskid },relations: ['taskid'] })
  }

  async update(commentid: number, updateCommentDto: UpdateCommentDto,@Req() req:Request) {
    const comment = await this.commentrep.findOne({where : {commentid}})
    if(!comment){
      throw new NotFoundException('comment not found')
    }
    const user = req.user?.userid  
    const author = await this.commentrep.find({where :{authorid : {userid : user}}})

    if (author.length === 0){
      throw new NotFoundException('user not found')
    }
  
    const commentsId = author.map(authors=>authors.commentid)
    
    if(!commentsId.includes(commentid)){
      throw new ForbiddenException('only the author can make changes')
    }

    Object.assign(comment,updateCommentDto)
    await this.commentrep.save(comment)
    return{
      message: "successfully updated comment"
    }
  }

  async remove(commentid: number,@Req() req:Request) {
    const comment = await this.commentrep.findOne({where : {commentid}})
    if(!comment){
      throw new NotFoundException('comment not found')
    }
    
    const user = req.user?.userid
    
    const author = await this.commentrep.find({where:{authorid :{userid:user}}})
    
    if(author.length === 0 ){
      throw new NotFoundException('you have no comments')
    }
    const commentsId = author.map(athors=>athors.commentid)
    
    if(!commentsId.includes(commentid)){
      throw new ForbiddenException('you can only delete your own comments')
    }
    await this.commentrep.remove(comment)
    return {
      message : "Comment Succesfully deleted"
    }
  }
}
