import { Services } from "./service"
import { LoginData } from "../models"
import bcrypt from 'bcrypt'
import { validateObject } from "../helpers/validate"

export class AuthServices extends Services
{
    public async login(loginData : LoginData)
    {
        const client = await this.repository.connect()
        try {
            const valObjectCount = validateObject(loginData)
            if (valObjectCount !== 2)
            {
                return {'status': 400, 'error': 'Informar email e senha para realizar login'}
            }

            const findUser = await this.repository.login(client, loginData.email)
            const match = await bcrypt.compare(loginData.password, findUser.password)
            if (match)
            {
                this.repository.release(client)
                return findUser
            }
            return {'status': 400, 'error': 'Email/senha incorretos'}            
        }
        catch (error)
        {
            this.repository.release(client)
            let message
            if (error instanceof Error) message = error.message
            return {'status': 500, 'error': message || 'Erro ao fazer login'}            
        }
    }
}