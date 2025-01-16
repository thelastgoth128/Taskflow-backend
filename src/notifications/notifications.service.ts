import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Not, Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notifications } from './entities/notification.entity';
import { Request, response } from 'express';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(Notifications)
    private readonly notify : Repository<Notifications>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>
  ){}

  async create(createNotificationDto: CreateNotificationDto) {
    const { assignedto,assingedby,...notificationData } = createNotificationDto
    const createdby = await this.userrep.findOne({where : {userid : assingedby}})
    const user = await this.userrep.findOne({where : { userid : assignedto }})

    if(!user){
      throw new NotFoundException('user does not exist')
    }

    if(!createdby){
      throw new NotFoundException('user not found')
    }
   const notification = this.notify.create({
      ...notificationData,
      assignedby : createdby.userid,
      assignedto : user
    })
    return await this.notify.save(notification)
  }

  async findAll(@Req() req:Request) {
    const user = req.user?.userid
    if(!user){
      throw new NotFoundException('you are not logged in')
    }
    const notification =  await this.notify.find({where: {assignedto:{userid : user}},relations : ['assignedto']})
    if(notification.length === 0){
      throw new NotFoundException('you have no notifications')
    }
    return notification
  }

  async findOne(userid: number) {
    return await this.notify.findOne({where:{assignedby:userid},relations : ['assignedto']})
  }

  async update(notificationid: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notify.findOne({where: { notificationid }})

    if(!notification){
      throw new NotFoundException('notification  not found')
    }
    Object.assign(notification,updateNotificationDto)
    return await this.notify.save(notification)
    
  }

  async remove(notificationid: number) {
    const notification = await this.notify.findOne({where : {notificationid}})

    if(!notification){
      throw new NotFoundException('notifications not found')
    }

    return this.notify.remove(notification)
  }
}
