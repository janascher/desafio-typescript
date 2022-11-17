import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { TeamServices } from '../services/teams';
import { TeamData } from '../models';

export class TeamController
{
    private teamServices : TeamServices;

    constructor(service : TeamServices)
    {
        this.teamServices = service;
    }

    public async findAllTeams(req: Request, res: Response)
    {
        const result = await this.teamServices.getAllTeams();
    }

    public async findTeam(req: Request, res: Response)
    {

    }

    public async createTeam(req: Request, res: Response)
    {
        const { userType } = req as any;
        const teamId : string = uuid();
        const teamData : TeamData = req.body;
        const result = await this.teamServices.createNewTeam(userType, teamId, teamData);

        if (result.error === null) {
            res.status(200).json({ result });
        } else {
            res.status(result.status).json({message: result.error});
        }
    }

    public async addTeamMember(req: Request, res: Response)
    {
        const result = await this.teamServices.addNewTeamMember();
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