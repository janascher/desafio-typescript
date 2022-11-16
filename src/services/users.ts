import { Repository } from "../repositories/index";

export class UserServices {
    private repository : Repository;

    constructor()
    {
        this.repository = new Repository();
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
}