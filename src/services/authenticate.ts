import { Repository } from "../repositories/index";

export class AuthServices {
    private repository : Repository;

    constructor()
    {
        this.repository = new Repository();
    }

    public async login()
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