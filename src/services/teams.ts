import { Repository } from "../repositories/index";

export class TeamServices {
    private repository : Repository;

    constructor(repo : Repository)
    {
        this.repository = repo;
    }

    public async getAllTeams()
    {
        const client = await this.repository.connect(); 
        try {
            const getTeams = await this.repository.getAllTeams(client);
            this.repository.release(client);
            return getTeams;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando Teams'};
        }
    } 

    public async getTeam(teamId : string)
    {
        const client = await this.repository.connect(); 
        try {
            const getTeam = await this.repository.getTeamById(client, teamId);
            this.repository.release(client);
            return getTeam;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando Team'};
        }
    } 
}