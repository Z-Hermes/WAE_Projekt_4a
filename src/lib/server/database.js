import mysql from 'mysql2/promise';
import {DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST} from '$env/static/private';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
});

export default pool ;