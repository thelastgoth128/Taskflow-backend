import { ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateTeammemberDto } from './dto/create-teammember.dto';
import { UpdateTeammemberDto } from './dto/update-teammember.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Teams } from 'src/teams/entities/team.entity';
import { Teammembers } from './entities/teammember.entity';
import { Request } from 'express';

@Injectable()
export class TeammembersService {

  constructor(
    @InjectRepository(Teammembers)
    private readonly teammember : Repository<Teammembers>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>,
    @InjectRepository(Teams)
    private readonly team : Repository<Teams>
  ){}

 async create(createTeammemberDto: CreateTeammemberDto,@Req() req:Request) {
    const { teamid } = createTeammemberDto;
    const userid = req.user?.userid
    console.log(userid)

    const already = await this.teammember.find({where:{userid},relations:['teamid']})
    const alreadyInTeam = already.map(teams=>teams.teamid.teamid)
    console.log(alreadyInTeam)
    
    const user = await this.userrep.findOne({where : { userid }})
    const team = await this.team.findOne({where : { teamid }})
    const teamId = team.teamid
    console.log(teamId)
    if(alreadyInTeam.includes(teamId)){
      throw new ForbiddenException('your already in the team')
    }
    
    if(!user){
      throw new NotFoundException(' user does not exist')
    }

    if(!team){
      throw new NotFoundException(' team does not exist ')
    }

    const teammember = this.teammember.create({
      userid : user.userid,
      teamid : team
 })

    return await this.teammember.save(teammember)
    
  }

  async findAll() {
    return await this.teammember.find({relations :['teamid','userid']})
  }

  async findOne(teamid: number) {
    return await this.teammember.findOne({where : {teamid : {teamid}},
    relations:['teamid','userid']})
  }

  update(id: number, updateTeammemberDto: UpdateTeammemberDto) {
    return `This action updates a #${id} teammember`;
  }

  async remove(userid: number) {
    const member = await this.teammember.findOne({where : { userid :userid },relations:['teamid', 'userid']})
       if(!member){
        throw new NotFoundException('the teammember does not exist')
       } 
       return await this.teammember.remove(member)
  }
}
