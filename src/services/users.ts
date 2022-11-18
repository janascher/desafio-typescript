import { Services } from "./service";
import { UserData, PatchData } from "../models";
import bcrypt from 'bcrypt';
import { EmailValidator, NameValidator, PasswordValidator } from "../validator/string";
import { BooleanValidator, StringValidator } from "../validator";

export class UserServices extends Services {
    public async getAllUsers()
    {
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const findUser = await this.repository.getAllUsers(client);
            // this.repository.commit(client);
            this.repository.release(client);
            return findUser
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando usuários'};
        }
    } 

    public async getMyUser(userId: string){
        const client = await this.repository.connect(); 
        try {
            const getMyUser = await this.repository.getMyUser(client, userId) 
            this.repository.release(client);
            return getMyUser;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando usuário'};
        }
    }

    public async getUserById(userId: string){
        const client = await this.repository.connect(); 
        try {
            const getUserById = await this.repository.getUserById(client, userId) 
            this.repository.release(client);
            return getUserById;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro buscando usuário'};
        }
    }

    public async create(userId: string, userData : UserData )
    {
        const valEmail = new EmailValidator(userData.email);
        const valPwd = new PasswordValidator(userData.password);
        const valUserName = new StringValidator(userData.username);
        const valFirstName = new NameValidator(userData.first_name);
        const valLastName = new NameValidator(userData.last_name);
        const valIsAdmin = new BooleanValidator(userData.is_admin);     

        userData.password = await this.hashPassword(userData.password);
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const createdUser = await this.repository.createUser(client, userId, userData);
            // this.repository.commit(client);
            this.repository.release(client);
            return createdUser;
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            return {'status': 400, 'error': message}            
        }
    }
    
    public async update(param: PatchData<UserData>)
    {
        const client = await this.repository.connect();
        try {
            const columnsArray = ['updated_at']
            const values : any[] = [param.id, 'now()']

            if (param.data.email) {
                const valEmail = new EmailValidator(param.data.email)
                columnsArray.push('email')
                values.push(param.data.email)
            }
            if (param.data.first_name) {
                const valName = new NameValidator(param.data.first_name)
                columnsArray.push('first_name')
                values.push(param.data.first_name)
            }
            if (param.data.last_name) {
                const valName = new NameValidator(param.data.last_name)
                columnsArray.push('last_name')
                values.push(param.data.last_name)
            }
            if (param.data.is_admin) {
                const valAdmin = new BooleanValidator(param.data.is_admin)
                columnsArray.push('is_admin')
                values.push(param.data.is_admin)
            }
            if (param.data.password) {
                const valPwd = new PasswordValidator(param.data.password)
                columnsArray.push('password')
                values.push(this.hashPassword(param.data.password))
            }
            if (param.data.username) {
                const valUserName = new NameValidator(param.data.username)
                columnsArray.push('username')
                values.push(param.data.username)
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

            const updatedUser = await this.repository.patch(client, this.tableName, updateData)
            this.repository.release(client);
            return { 'error': null }
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'Erro ao atualizar usuário'}
        }
    }

    public async removeUser(userId: string) {
        const client = await this.repository.connect();
        
        try {
            const deleteUser = await this.repository.deleteUser(client, userId);
            this.repository.release(client);
            return deleteUser;
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro deletando usuário'};
        }
    }

    private async hashPassword(plaintextPassword : string) {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash;
    }  
}