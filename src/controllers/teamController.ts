import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { TeamServices } from '../services/teams'
import { TeamData } from '../models'
import { AuthenticatedUserDataRequest } from '../models'

export class TeamController
{
    private teamServices : TeamServices

    constructor(service : TeamServices)
    {
        this.teamServices = service
    }

    public async findAllTeams(req: AuthenticatedUserDataRequest, res: Response)
    {
        const userType = req.userType
        if (userType)
        {
            const result = await this.teamServices.getAllTeams()
            if(result.error === null)
            {
                res.status(200).json(result)
            }
            else
            {
                res.status(result.status).json({message: result.error})
            }
        }
        else
        {
            res.status(401).json({message: 'Usuário não tem autorização.'})
        }
    }   

    public async findTeam(req: AuthenticatedUserDataRequest, res: Response)
    {
        const teamId = req.params.team_id
        const userType = req.userType
        const userId = req.userId
        let isLeader = false
        let isMember = false

        const leader = await this.teamServices.getTeamLeader(teamId)
        if (leader.error === null)
        {
            if (leader.leaderId)
            {
                if (leader.leaderId===userId)
                {
                    isLeader = true
                }
            }
        }

        const member = await this.teamServices.getMember(userId, teamId)
        if (member.error === null)
        {
            if (member.memberId)
            {
                if (member.memberId===userId)
                {
                    isMember = true
                }
            }
        }

        if (userType || isLeader || isMember)
        {
            const result = await this.teamServices.getTeam(teamId)
            if(result.error === null)
            {
                res.status(200).json(result)
            }
            else
            {
                res.status(result.status).json({message: result.error})
            }
        }
        else
        {
            res.status(401).json({message: 'Usuário não tem autorização.'})
        }    
    }

    public async createTeam(req: AuthenticatedUserDataRequest, res: Response)
    {
        const { userType } = req
        const teamId : string = uuid()
        const teamData : TeamData = req.body
        const result = await this.teamServices.createNewTeam(userType, teamId, teamData)

        if (result.error === null)
        {
            res.status(200).json(result)
        }
        else
        {
            res.status(result.status).json({message: result.error})
        }
    }

    public async addTeamMember(req: AuthenticatedUserDataRequest, res: Response)
    {
        const { userId, userType } = req
        const { team_id, user_id } = req.params
        const result = await this.teamServices.addNewTeamMember(userId, userType, team_id, user_id)

        if (result.error === null)
        {
            res.status(200).json(result)
        }
        else
        {
            res.status(result.status).json({message: result.error})
        }
    }

    public async updateTeam(req: AuthenticatedUserDataRequest, res: Response)
    {
        const teamId = req.params.team_id
        const {userType, userId} = req

        if (!userType)
        {
            const leader = await this.teamServices.getTeamLeader(teamId)
            if (leader.error === null)
            {
                if (leader.leaderId !== userId)
                {
                    return res.status(401).json({message: 'Não autorizado'})
                }
            }
            else
            {
                return res.status(leader.status).json({message: leader.error})
            }
        }

        const id = teamId
        const data : Partial<TeamData> = req.body
        const result = await this.teamServices.update({id, data})

        if (result.error === null)
        {
            res.status(200).json({message: 'Time atualizado com sucesso!'})
        }
        else
        {
            res.status(result.status).json({message: result.error})
        }
    }

    public async deleteTeam(req: AuthenticatedUserDataRequest, res: Response)
    {
        const userType = req.userType
        const teamId = req.params.team_id
        if (userType)
        {
            const result = await this.teamServices.deleteTeam(teamId)
            if(result.error === null)
            {
                return res.status(200).json(result)
            }
            else
            {
                return res.status(result.status).json({message: result.error})
            }
        }
        else
        {
            res.status(401).json({message: 'Usuário não tem autorização.'})
        } 
    }

    public async deleteTeamMember(req: AuthenticatedUserDataRequest, res: Response)
    {
        const userType = req.userType
        const userId = req.params.user_id
        const teamId = req.params.team_id
        const user = req.userId
        if (userType)
        {
            const result = await this.teamServices.deleteTeamMember(userId, teamId)
            if(result.error === null)
            {
                return res.status(200).json(result)
            }
            else
            {
                return res.status(result.status).json({message: result.error})
            }
        } 

        const leader = await this.teamServices.getTeamLeader(teamId)
        
        if (leader.error === null)
        {
            if (leader.leaderId)
            {
                if (leader.leaderId===user)
                {
                    const result = await this.teamServices.deleteTeamMember(userId, teamId)
                    if(result.error === null)
                    {
                        return res.status(200).json(result)
                    }
                    else
                    {
                        return res.status(result.status).json({message: result.error})
                    }
                }
                else
                {
                    res.status(401).json({message: 'Usuário não tem autorização.'})
                }    
            }
            else
            {
                res.status(401).json({message: 'Usuário não tem autorização.'})
            }
        }
        else
        {
            res.status(leader.status).json({message: leader.error})
        }
    }
}    