import { Request, Response } from 'express';
import { TeamServices } from '../services/teams';
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

    public async createTeam(req: Request, res: Response)
    {

    }

    public async addTeamMember(req: Request, res: Response)
    {

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