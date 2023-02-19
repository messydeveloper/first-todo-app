const pg = require('pg');
const {Client} = require('pg');

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
pool.connect();
// const pool = new pg.Pool({
//     user: process.env.DB_USER,
//     host:process.env.DB_HOST,
//     database:process.env.DB,
//     password:process.env.DB_PW,
//     port:process.env.DB_PORT
// });

module.exports = pool;