import mysql from 'mysql2/promise';

// Read database configuration from environment variables
import {
	DB_NAME,
	DB_USER,
	DB_PASSWORD,
	DB_PORT,
	DB_HOST
} from '$env/static/private';

// Create a reusable MySQL connection pool
const pool = mysql.createPool({

	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	port: DB_PORT,
	database: DB_NAME,

});

// Export pool so other files can execute SQL queries
export default pool;