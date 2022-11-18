import { Repository } from "../repositories/index";
import { LoginData } from "../models/interfaces";
import bcrypt from 'bcrypt';
import { EmailValidator } from "../validator/string/emailValidator";
import { PasswordValidator } from "../validator/string/passwordValidator";

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
            const valEmail = new EmailValidator(loginData.email);
            const valPwd = new PasswordValidator(loginData.password);

            const findUser = await this.repository.login(client, loginData.email);
            const match = await bcrypt.compare(loginData.password, findUser.password);
            if (match){
                this.repository.release(client);
                return findUser;
            }
            return {'status': 400, 'error': 'Login/Senha incorretos'}            
            // this.repository.commit(client);
        } catch (error ){
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            return {'status': 400, 'error': message}            
        }
    } 
     
}