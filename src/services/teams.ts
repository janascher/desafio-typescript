import { Repository } from "../repositories/index";
import { TeamData } from '../models';

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
            // this.repository.begin(client);
            const findUser = await this.repository.anyQuery(client);
            // this.repository.commit(client);
            this.repository.release(client);
        } catch (error) {
            this.repository.release(client);
        }
    }

    public async createNewTeam(userType: string, teamId: string, teamData: TeamData)
    {
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const is_admin = userType
            if (is_admin) {
                const newTeamData = await this.repository.createTeamQuery(client, teamId, teamData);
                this.repository.release(client);
                return newTeamData
            } else {
                throw new Error(`Apenas Usuários Administradores podem criar Equipes!`)
            }
            // this.repository.commit(client);
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': error};
        }
    }

    public async addNewTeamMember()
    {
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const teamMemberAddedData = await this.repository.addNewTeamMemberQuery(client);
            // this.repository.commit(client);
            this.repository.release(client);
        } catch (error) {
            this.repository.release(client);
        }
    }
}