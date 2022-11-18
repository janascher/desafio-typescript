import { Services } from './service';
import { PatchData, TeamData } from '../models';
import { NameValidator, UUIDValidator } from '../validator/string';
import { BooleanValidator } from '../validator';

export class TeamServices extends Services {    
    public async getAllTeams()
    {
        const client = await this.repository.connect(); 
        try {
            const getTeams = await this.repository.getAllTeams(client);
            this.repository.release(client);
            return getTeams;
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando times'}
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
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando time pelo ID'}
        }
    } 

    public async getTeamLeader(teamId : string)
    {
        const client = await this.repository.connect(); 
        try {
            const teamLeader = await this.repository.getTeamLeader(client, teamId);
            this.repository.release(client);
            return teamLeader;
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando líder do time'}
        }
    }    

    public async deleteTeamMember(userId : string, teamId : string)
    {
        const client = await this.repository.connect(); 
        try {
            const delMember = await this.repository.deleteTeamMember(client, userId, teamId);
            this.repository.release(client);
            return delMember;
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro excluindo membro do time'}
        }
    }    


    public async createNewTeam(userType: boolean, teamId: string, teamData: TeamData)
    {
        const client = await this.repository.connect();
        try {
            const is_admin = userType
            if (is_admin) {
                this.repository.begin(client);
                const valLeaderId = new UUIDValidator(teamData.leader);
                const valNameId = new NameValidator(teamData.name);
                const findUser = await this.repository.getUserById(client, teamData.leader);
                const newTeamData = await this.repository.createTeamQuery(client, teamId, teamData);
                this.repository.commit(client);
                this.repository.release(client);
                return newTeamData
            } else {
                throw new Error(`Apenas Usuários Administradores podem criar Equipes!`)
            }
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro ao tentar criar novo time'}
        }
    }

    public async addNewTeamMember(leader_id: string, userType: boolean, team_id: string, user_id: string)
    {
        const client = await this.repository.connect();
        try {
            const valAdmin = new BooleanValidator(userType);
            const valTeamId = new UUIDValidator(team_id);
            const valUserId = new UUIDValidator(user_id);
            const valLeaderId = new UUIDValidator(leader_id);
            const is_admin = userType
            if (!is_admin) {
                const teamLeader = await this.getTeamLeader(team_id);
                if (teamLeader.error === null) {
                    if (teamLeader.leaderId !== leader_id) {
                        throw new Error('Não autorizado')
                    }
                } else {
                    throw new Error('Erro ao pesquisar líder');
                }
            }
            
            this.repository.begin(client);
            const findUser = await this.repository.getUserById(client, user_id);
            const findTeam = await this.repository.getTeamById(client, team_id);
            const teamMemberAddedData = await this.repository.addNewTeamMemberQuery(client, team_id, user_id);
            this.repository.commit(client);
            this.repository.release(client);
            return teamMemberAddedData
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro ao tentar adicionar membro ao time'}
        }
    }

    public async update(param: PatchData<TeamData>)
    {
        const client = await this.repository.connect();
        try {
            const columnsArray = ['updated_at']
            const values : any[] = [param.id, 'now()']

            if (param.data.leader) {
                const valLeader = new UUIDValidator(param.data.leader)
                columnsArray.push('leader')
                values.push(param.data.leader)
            }
            if (param.data.name) {
                const valName = new NameValidator(param.data.name)
                columnsArray.push('name')
                values.push(param.data.name)
            }

            let columns = `${columnsArray[0]}`
            let references = `$2`
            for (let i = 1; i < columnsArray.length; i++) {
                columns = columns.concat(`, ${columnsArray[i]}`);
                references = references.concat(`, $${i + 2}`);
            };

            const updateData  = {
                columns,
                references,
                values
            }

            const updatedTeam = await this.repository.patch(client, this.tableName, updateData)
            this.repository.release(client);
            return { 'error': null }
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro ao atualizar time'}
        }
    }
}