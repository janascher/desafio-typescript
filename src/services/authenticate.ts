import { Repository } from "../repositories/index";
import { LoginData } from "../models/interfaces";
import bcrypt from 'bcrypt';

export class AuthServices {
    private repository : Repository;

    constructor(repo : Repository)
    {
        this.repository = repo;
    }

    public async login(loginData : LoginData)
    {
        const client = await this.repository.connect();
        try {
            // this.repository.begin(client);

            const findUser = await this.repository.login(client, loginData.email);
            const match = await bcrypt.compare(loginData.password, findUser.password);
            if (match){
                this.repository.release(client);
                return findUser;
            }
            return {'status': 400, 'error': 'Login/Senha incorretos'}            
            // this.repository.commit(client);
        } catch (error) {
            console.log(error)
            this.repository.release(client);
            return {'status': 400, 'error': 'Login/Senha incorretos'}            
        }
    } 
     
}