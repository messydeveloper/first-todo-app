// const pg = require('pg');
const {Client, Pool} = require('pg');
const pgSession = require('connect-pg-simple');

// const pool = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
  
// pool.connect();
const pool = new Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB,
    password:process.env.DB_PW,
    port:process.env.DB_PORT
    // user:'postgres',
    // host:'localhost',
    // database:'todoapp',
    // port:5432
});

module.exports = pool;