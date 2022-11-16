import * as dotenv from 'dotenv';
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 20,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 20000,
})

export default pool;