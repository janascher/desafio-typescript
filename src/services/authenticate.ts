import { Services } from "./service";
import { Repository } from "../repositories/index";
import { LoginData } from "../models/interfaces";
import bcrypt from 'bcrypt';
import { EmailValidator } from "../validator/string/emailValidator";
import { PasswordValidator } from "../validator/string/passwordValidator";

export class AuthServices extends Services {
    public async login(loginData : LoginData)
    {
        const client = await this.repository.connect();
        try {
            const valEmail = new EmailValidator(loginData.email);
            const valPwd = new PasswordValidator(loginData.password);

            const findUser = await this.repository.login(client, loginData.email);
            const match = await bcrypt.compare(loginData.password, findUser.password);
            if (match){
                this.repository.release(client);
                return findUser;
            }
            return {'status': 400, 'error': 'Login/Senha incorretos'}            
        } catch (error) {
            this.repository.release(client);
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            return {'status': 400, 'error': message}            
        }
    } 
     
}