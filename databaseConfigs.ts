// connection pool
import dotenv from 'dotenv';
dotenv.config();

const Pool = require('pg').Pool;

export const pool = new Pool({
   database: process.env.DATABASE,
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.DB_USER,
   password: process.env.PASSWORD,
})