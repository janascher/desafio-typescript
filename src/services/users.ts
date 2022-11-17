import { Repository } from "../repositories/index";
import { UserData } from "../models";
import bcrypt from 'bcrypt';

export class UserServices {
    private repository : Repository;

    constructor(repo : Repository)
    {
        this.repository = repo;
    }

    public async getAllUsers()
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

    public async create(userId: string, userData : UserData )
    {
        userData.password = await this.hashPassword(userData.password);
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);
            const createdUser = await this.repository.createUser(client, userId, userData);
            // this.repository.commit(client);
            this.repository.release(client);
            if (createdUser){
                return createdUser;
            }    
            return {'status': 500, 'error': 'erro criando usuário'};    
        } catch (error) {
            this.repository.release(client);
            return {'status': 500, 'error': 'erro criando usuário'};
        }
    } 

    private async hashPassword(plaintextPassword : string) {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash;
    }  
}