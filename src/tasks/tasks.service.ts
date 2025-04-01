import { BadRequestException, Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly task : Repository<Tasks>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>,
    @Inject()
     private readonly notificationService : NotificationsService
  ){} 
  
  async create(createTaskDto: CreateTaskDto,@Req() req:Request): Promise<Tasks> {
    const { assignedto, ...taskData } = createTaskDto;
    const createdby = req.user.userid

    const createdBy = await this.userrep.findOne({ where: { userid: createdby } });
    console.log('assignedto:',assignedto)

    if (!createdBy) {
        throw new NotFoundException(`User with id ${createdby} not found`);
    }

    let assignedTo = null

    if (assignedto) {
      assignedTo = await this.userrep.findOne({where : {userid: assignedto}})
      if (!assignedTo){
      throw new NotFoundException('user not found')
      }
    }

    const task = this.task.create({
        ...taskData,
        createdby: createdBy,
        assignedto: assignedTo,
        starttime:new Date(),
        priority:createTaskDto.priority || "Medium",
        status:"To do",
        duedate:createTaskDto.duedate || new Date(),
        team : createTaskDto.team,

    });
       await  this.notificationService.create({
          assignedto:assignedto,
          assingedby:createdby,
          notificationtext:'you have been assigned a task',
          isread:false,
          createdat:new Date()
        })  
    return await this.task.save(task);

}
  

 async findAll() {
    return await this.task.find({
      relations:['createdby','assignedto']
    })
  }
  async findUserTasks(@Req() req:Request) {
    const userid =req.user?.userid
    const user = await this.userrep.findOne({where: {userid}})
    console.log(user)
    if (!user){
      throw new BadRequestException('Not authorized')
    }

    const tasks = await this.task.find({
      where: [
        { createdby: { userid: user.userid } },
        { assignedto: { userid: user.userid } }
      ],
      relations:['assignedto','createdby','team'],
    })
    console.log(tasks)
    return tasks
  }

  async findOne(taskid: number) {
    return await this.task.findOne({where : { taskid },
    relations:['createdby', 'assignedto']
    })
  }

async update(taskid: number, updateTaskDto : UpdateTaskDto) {
  const { createdby, assignedto, ...taskData } = updateTaskDto;

  const task = await this.task.findOne({where : { taskid }})
  if (!task){
    throw new NotFoundException('Task not found')
  }
  if(createdby){
    const createdBy = await this.userrep.findOne({where : { userid: createdby }})
    if (!createdBy){
      throw new NotFoundException ('user not found')
    }
    const assignedTo = await this.userrep.findOne({where : {userid : assignedto}})
    if(!assignedTo){
      throw new NotFoundException('user not found')
    }
    task.assignedto = assignedTo
  }
  Object.assign(task,taskData)
  return await this.task.save(task)
}

 async remove(taskid: number) {
    return await this.task.delete(taskid)
  }
}
