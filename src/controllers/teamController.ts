import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { TeamServices } from '../services/teams';
import { TeamData } from '../models';
import { AuthenticatedUserDataRequest } from '../models';


export class TeamController
{
    private teamServices : TeamServices;

    constructor(service : TeamServices)
    {
        this.teamServices = service;
    }

    public async findAllTeams(req: AuthenticatedUserDataRequest, res: Response)
    {
        const userType = req.userType
        if (userType) {
            const result = await this.teamServices.getAllTeams();
            if(result.error === null){
                res.status(200).json(result)
            }
            else{
                res.status(result.status).json({message: result.error})
            }
        }
        else {
            res.status(401).json({message: 'Usuário não tem autorização.'})
        }
    }   

    public async findTeam(req: Request, res: Response)
    {

    }

    public async createTeam(req: AuthenticatedUserDataRequest, res: Response)
    {
        const { userType } = req;
        const teamId : string = uuid();
        const teamData : TeamData = req.body;
        const result = await this.teamServices.createNewTeam(userType, teamId, teamData);

        if (result.error === null) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({message: result.error});
        }
    }

    public async addTeamMember(req: AuthenticatedUserDataRequest, res: Response)
    {
        const { userType } = req;
        const { team_id, user_id } = req.params;
        const result = await this.teamServices.addNewTeamMember(userType, team_id, user_id);

        if (result.error === null) {
            res.status(200).json(result)
        } else {
            res.status(result.status).json({message: result.error});
        }
    }

    public async updateTeam(req: Request, res: Response)
    {

    }

    public async deleteTeam(req: Request, res: Response)
    {

    }

    public async deleteTeamMember(req: Request, res: Response)
    {

    }
}