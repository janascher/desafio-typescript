import { Services } from "./service";
import { UserData, PatchData } from "../models";
import bcrypt from 'bcrypt';
import { validateObject } from "../helpers/validate";

export class UserServices extends Services
{
    public async getAllUsers()
    {
        const client = await this.repository.connect()
        try
        {
            const findUser = await this.repository.getAllUsers(client)
            this.repository.release(client)
            return findUser
        }
        catch (error)
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando todos os usuários'}
        }
    } 

    public async getMyUser(userId: string)
    {
        const client = await this.repository.connect()
        try
        {
            validateObject({'user_id': userId})

            const getMyUser = await this.repository.getMyUser(client, userId) 
            this.repository.release(client)
            return getMyUser
        } 
        catch (error) 
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando meu usuário'}
        }
    }

    public async getUserById(userId: string)
    {
        const client = await this.repository.connect()
        try
        {
            validateObject({'user_id': userId})

            const getUserById = await this.repository.getUserById(client, userId) 
            this.repository.release(client)
            return getUserById
        }
        catch (error) 
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro buscando usuário pelo ID'}
        }
    }

    public async create(userId: string, userData : UserData )
    {
        const client = await this.repository.connect() 
        try
        {
            validateObject({'user_id': userId})
            const valObjectCount = validateObject(userData)
            if (valObjectCount !== 6)
            {
                throw new Error('Informe todos os 6 campos para criar um usuário')
            }

            userData.password = await this.hashPassword(userData.password)
            const createdUser = await this.repository.createUser(client, userId, userData)
            this.repository.release(client)
            return createdUser
        }
        catch (error)
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 400, 'error': message || 'Erro ao tentar criar usuário'}            
        }
    }
    
    public async update(param: PatchData<UserData>)
    {
        const client = await this.repository.connect()
        try 
        {
            const columnsArray = ['updated_at']
            const values : any[] = [param.id, 'now()']

            const valObjectCount = validateObject(param.data)
            if (valObjectCount === 0)
            {
                throw new Error('Informe ao menos um campo para atualização')
            }

            if (param.data.email)
            {
                columnsArray.push('email')
                values.push(param.data.email)
            }
            if (param.data.first_name)
            {
                columnsArray.push('first_name')
                values.push(param.data.first_name)
            }
            if (param.data.last_name)
            {
                columnsArray.push('last_name')
                values.push(param.data.last_name)
            }
            if (param.data.is_admin !== undefined)
            {
                columnsArray.push('is_admin')
                values.push(param.data.is_admin)
            }
            if (param.data.password)
            {
                columnsArray.push('password')
                values.push(await this.hashPassword(param.data.password))
            }
            if (param.data.username)
            {
                columnsArray.push('username')
                values.push(param.data.username)
            }

            let columns = `${columnsArray[0]}`
            let references = `$2`
            for (let i = 1; i < columnsArray.length; i++)
            {
                columns = columns.concat(`, ${columnsArray[i]}`)
                references = references.concat(`, $${i + 2}`)
            }

            const updateData = {
                columns,
                references,
                values
            }

            await this.repository.begin(client)
            const updatedUser = await this.repository.patch(client, this.tableName, updateData)
            const getUserById = await this.repository.getUserById(client, updatedUser.id)
            await this.repository.commit(client)
            this.repository.release(client)
            return getUserById
        }
        catch (error)
        {
            await this.repository.rollback(client)
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro ao atualizar usuário'}
        }
    }

    public async removeUser(userId: string)
    {
        const client = await this.repository.connect()
        try
        {
            validateObject({'user_id': userId})

            const deleteUser = await this.repository.deleteUser(client, userId)
            this.repository.release(client)
            return deleteUser
        }
        catch (error)
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro deletando usuário'}
        }
    }

    public async getTeamLeader(userId : string)
    {
        const client = await this.repository.connect()
        try
        {
            validateObject({'user_id': userId})

            const teamLeader = await this.repository.getIsTeamLeader(client, userId)
            this.repository.release(client)
            return teamLeader
        }
        catch (error)
        {
            this.repository.release(client)
            return {'status': 500, 'error': 'erro buscando Team Leader'}
        }
    }

    private async hashPassword(plaintextPassword : string)
    {
        const hash = await bcrypt.hash(plaintextPassword, 10)
        return hash
    }
}