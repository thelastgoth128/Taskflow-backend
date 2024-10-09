import { ForbiddenException, Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
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
  
  async create(createTaskDto: CreateTaskDto,@Req() req:Request) {
    const { assignedto, ...taskData } = createTaskDto;
    const createdby = req.user.userid

    const createdBy = await this.userrep.findOne({ where: { userid: createdby } });
    const assignedTo = await this.userrep.findOne({ where: { userid:assignedto } });

    if (!createdBy) {
        throw new NotFoundException(`User with id ${createdby} not found`);
    }

    if (!assignedTo) {
        throw new NotFoundException(`User with id ${assignedto} not found`);
    }

    const task = this.task.create({
        ...taskData,
        createdby: createdBy,
        assignedto: assignedTo,
    });
    const saved =await this.task.save(task);
       await  this.notificationService.create({
          assignedto:assignedto,
          taskid : saved.taskid,
          assingedby:createdby,
          notificationtext:'you have been assigned a task',
          isread:false,
          createdat:new Date()
        })  
    return {
      message : "successfully created task"
    }

}
  

 async findAll(@Req() req: Request) {
  const user = req.user?.userid
    return await this.task.find({where : {createdby :{userid : user}},
      relations:['createdby','assignedto']
    })
  }

  async findOne(taskid: number) {
    return await this.task.findOne({where : { taskid },
    relations:['createdby', 'assignedto']
    })
  }
async update(taskid: number, updateTaskDto : UpdateTaskDto,@Req() req: Request) {
const { createdby , assignedto, ...taskData } = updateTaskDto
const user = req.user?.userid
const taskId = await this.task.findOne({where : {taskid}})

if(!taskId){
  throw new NotFoundException('task not found')
}
const myTask =  await this.task.find({where : {createdby : {userid : user}}})
const taskList = myTask.map(myTask=> myTask.taskid)
if (!taskList.includes(taskId.taskid)){
  throw new ForbiddenException('you can only edit tasks created by you')
}
Object.assign(taskId,taskData)
await this.task.save(taskId)
return {
  message : " successfully updated task"
}
}

 async remove(taskid: number,@Req() req:Request) {
  const user = req.user?.userid
  const taskId = await this.task.findOne({where : {taskid}})
  
  if (!taskId){
    throw new NotFoundException('task not found')
  }

  const Mytask = await this.task.find({where : {createdby : {userid : user}} })

  if (Mytask.length === 0){
    throw new NotFoundException('you have no tasks')
  }

  const taskList = Mytask.map(Mytasks=> Mytasks.taskid)

  if (!taskList.includes(taskId.taskid)){
    throw new ForbiddenException('you can only delete tasks that you created')
  }
    await this.task.delete(taskid)
    return{
      message : 'successfully deleted task'
    }
  }
}
