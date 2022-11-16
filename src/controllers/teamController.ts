import { Request, Response } from 'express';
import { TeamServices } from '../services/teams';

export class TeamController
{
    private teamServices : TeamServices;

    constructor()
    {
        this.teamServices = new TeamServices();
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