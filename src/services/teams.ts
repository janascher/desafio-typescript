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

    

    public async createNewTeam(userType: boolean, teamId: string, teamData: TeamData)
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

    public async addNewTeamMember(userType: boolean, team_id: string, user_id: string)
    {
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const is_admin = userType
            if (is_admin) {
                const teamMemberAddedData = await this.repository.addNewTeamMemberQuery(client, team_id, user_id);
                this.repository.release(client);
                return teamMemberAddedData
            } else {
                throw new Error(`Erro: usuário não adicionado na equipe!`)
            }
            // this.repository.commit(client);
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': error};
        }
    }

}