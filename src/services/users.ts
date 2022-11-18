import { Repository } from "../repositories/index";
import { UserData } from "../models";
import bcrypt from 'bcrypt';
import { EmailValidator } from "../validator/string/emailValidator";
import { PasswordValidator } from "../validator/string/passwordValidator";
import { NameValidator } from "../validator/string/nameValidator";
import { StringValidator } from "../validator/stringValidator";
import { BooleanValidator } from "../validator/booleanValidator";
import { UUIDValidator } from "../validator/string/uuidValidator";


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
        if (userData.squad!==null){
            const valSquad = new UUIDValidator(userData.squad);
        }     

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