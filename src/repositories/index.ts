import { PoolClient } from 'pg';
import pool from '../config/db';
import { LoginData } from '../models/interfaces';

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
        return { 'error' : null };
    }

    public async login(client : PoolClient, _email : string)
    {
        const query = {
            'text':'SELECT id, email, password, username, is_admin FROM usuarios WHERE email = $1',
            'values':[_email]
        }

        const res = await client.query(query);
        return {'userID': res.rows[0].id, 'password': res.rows[0].password, 'userType': res.rows[0].is_admin, 'userEmail': res.rows[0].email, 'userName': res.rows[0].username, 'error': null};
    }
}