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
            console.log(getTeams)
            return getTeams;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando Teams'};
        }
    } 
}