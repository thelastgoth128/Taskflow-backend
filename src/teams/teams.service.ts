import { ForbiddenException, Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './entities/team.entity';
import { In, Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Request } from 'express';
import { TeammembersService } from 'src/teammembers/teammembers.service';
import { Teammembers } from 'src/teammembers/entities/teammember.entity';

@Injectable()
export class TeamsService {

  constructor(
  @InjectRepository(Teams)
  private readonly team : Repository<Teams>,
  @InjectRepository(Users)
  private readonly userrep : Repository<Users>,
  @Inject()
  private readonly teammembersService : TeammembersService,
  @InjectRepository(Teammembers)
  private readonly teammbersrep : Repository<Teammembers>
  ){}

 async create(createTeamDto: CreateTeamDto,@Req() req:Request) {
  const { ...teamsData } = createTeamDto
    const teamleader  = req.user?.userid
    console.log(teamleader)

    const user = await this.userrep.findOne({ where : { userid : teamleader }})

    if(!user) {
      throw new NotFoundException('user does not exist')
    }
    const team = this.team.create({
      ...teamsData,
      teamleader : user
    })

     await this.team.save(team)
     
     await this.teammembersService.create({
      teamid : team.teamid,
      userid :team.teamleader.userid
     },req)
     return{
      message : "Succesfully created a team"
     }
  }

  async findAll(@Req() req:Request) {
    const userId = req.user?.userid
    const member = await this.teammbersrep.find({where : {userid:userId},relations:['teamid']})
    if(member.length===0){
      throw new NotFoundException('you are not any teams')
    }
    const teamId = member.map(members=>members.teamid.teamid)
    console.log(teamId)
    const teams = await this.team.find({where : {teamid: In(teamId)},relations:['teamleader','teammembers.userid','teammembers.teamid']})
    
        
   return teams
  }

  async findOne(teamid: number) {
    return await this.team.findOne({where : { teamid },
    relations : ['teamleader']})
  }

  async update(teamid: number, updateTeamDto: UpdateTeamDto,@Req() req:Request) {
    const { teamleader, ...taskData } = updateTeamDto 
    const userId = req.user.userid
    console.log(userId)  

    const teams = await this.team.findOne({where : {teamid:teamid}, relations :['teamleader']})
    console.log(teams.teamleader.userid)
    
    if(!teams){
      throw new NotFoundException('team does not exist')
    }
    
    if(teams.teamleader.userid !== userId ){
      throw new NotFoundException('changes not saved because your not the leader')
    }
      Object.assign(teams,taskData)
      return await this.team.save(teams)
  }

  async remove(teamid: number,@Req() req:Request) {
    const userId = req.user?.userid
    const team = await this.team.findOne({where : {teamid}, relations:['teamleader']})
    if(!team){
      throw new NotFoundException('team does not exist')
    }
    if(team.teamleader.userid !== userId){
      throw new ForbiddenException('only the leader can make delete a team')
    }
    return await this.team.remove(team)
  }
}
