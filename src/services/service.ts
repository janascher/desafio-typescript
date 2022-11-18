import { Repository } from "../repositories"

export class Services
{
    protected repository : Repository
    protected tableName : string

    constructor(repo: Repository, table: string)
    {
        this.repository = repo
        this.tableName = table
    }
}