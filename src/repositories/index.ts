import { PoolClient } from 'pg';
import pool from '../config/db';

export class Repository
{
    private db;

    constructor()
    {
        this.db = pool;
    }

    public async connect()
    {
        const client = await this.db.connect();
        return client;
    }
    
    public async release(client : PoolClient)
    {
        client.release();
        return;
    }

    public async begin(client: PoolClient)
    {
        const begin = await client.query('BEGIN');
        return;
    }

    public async commit(client : PoolClient)
    {
        const commit = await client.query('COMMIT');
        return { 'error' : null };
    }

    public async rollback(client : PoolClient)
    {
        const rollback = await client.query('ROLLBACK');
        return;
    }

    public async anyQuery(client : PoolClient)
    {
        const query = {
            'text':'',
            'values':[]
        }

        const res = await client.query(query);

        return { 'error' : null }
    }
}