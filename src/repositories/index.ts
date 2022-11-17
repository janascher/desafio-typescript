import { PoolClient } from 'pg';
import pool from '../config/db';
import { UserData } from '../models/';

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

    public async getAllUsers(client : PoolClient)
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
            'text':'SELECT id, email, password, username, is_admin FROM usuario WHERE email = $1',
            'values':[_email]
        }

        const res = await client.query(query);
        return {'userId': res.rows[0].id, 'password': res.rows[0].password, 'userType': res.rows[0].is_admin, 'userEmail': res.rows[0].email, 'userName': res.rows[0].username, 'error': null};
    }

    public async createUser(client : PoolClient, userId : string,  userData : UserData)
    {
        const query = {
            'text':`INSERT INTO usuario 
                        (   id,
                            username,
                            first_name,
                            last_name,
                            email,
                            password,
                            squad,
                            is_admin)
                        values 
                        ($1, $2, $3, $4, $5, $6, $7, $8::bool) RETURNING id, username, email, is_admin
                    `,
            'values':[  userId, 
                        userData.username,
                        userData.first_name,
                        userData.last_name,
                        userData.email,
                        userData.password,
                        userData.squad,
                        userData.is_admin ]
        }
        const res = await client.query(query);

        return {'userId': res.rows[0].id, 'userType': res.rows[0].is_admin, 'userEmail': res.rows[0].email, 'userName': res.rows[0].username, 'error': null};
    }

    public async getMyUser(client: PoolClient, userId : string)
    {
        const query = {
            'text':`select usuario.id, usuario.is_admin, usuario.username, usuario.email, usuario.first_name, usuario.last_name, equipe.name 
            from usuario
            inner join equipe
            on usuario.squad = equipe.id
            where usuario.id = $1`,
            'values':[userId]
        }
        const res = await client.query(query)
        if(res.rows.length>0){
            return {'userId': res.rows[0].id,
                'userType': res.rows[0].is_admin, 
                'userEmail': res.rows[0].email, 
                'userName': res.rows[0].username, 
                'name': (res.rows[0].first_name+res.rows[0].last_name),
                'teamName': res.rows[0].name, 
                'error': null}
        }
        else{
            throw new Error('Impossivel buscar usuario')
        }
        
    }


    public async getUserById(client: PoolClient, userId : string)
    {
        const query = {
            'text':`select usuario.id, usuario.is_admin, usuario.username, usuario.email, usuario.first_name, usuario.last_name, equipe.name 
            from usuario
            inner join equipe
            on usuario.squad = equipe.id
            where usuario.id = $1`,
            'values':[userId]
        }
        const res = await client.query(query)

        return {'userId': res.rows[0].id,
                'userType': res.rows[0].is_admin, 
                'userEmail': res.rows[0].email, 
                'userName': res.rows[0].username, 
                'name': (res.rows[0].first_name+res.rows[0].last_name),
                'teamName': res.rows[0].name, 
                'error': null}
    }

    public async getAllTeams(client: PoolClient)
    {
        const query = {
            'text':`
                    SELECT a.id, a.name, b.username, d.username as member
                        FROM equipe a
                        LEFT JOIN usuario b on b.id = a.leader
                        LEFT JOIN (
                                    SELECT a.squad, b.name, a.username	
                                        FROM usuario a
                                        LEFT JOIN equipe b on a.squad = b.id
                                        LEFT JOIN usuario c on c.id = b.leader
                                        WHERE a.squad is not null) d on a.id=d.squad
                        ORDER BY 2,4
                    `,
            'values':[]
        }
        const res = await client.query(query);
        return {'data': res.rows, 'error': null};
    }

    public async getTeamById(client: PoolClient, teamId: string)
    {
        const query = {
            'text':`select equipe.id,equipe.name,usuario.username from equipe 
            inner join usuario
            on usuario.id = equipe.leader
            where equipe.id = $1`,
            'values':[teamId]
        }
        const res = await client.query(query)

        return {'teamId': res.rows[0].id, 'teamName': res.rows[0].name, 'teamLeader': res.rows[0].username, 'error': null}
    }
}

