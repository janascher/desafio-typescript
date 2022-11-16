import { Repository } from "../repositories/index";

export class TeamServices {
    private repository : Repository;

    constructor()
    {
        this.repository = new Repository();
    }

    public async getAllTeams()
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