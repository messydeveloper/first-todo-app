const pg = require('pg');
const {Client, Pool} = require('pg');
const pgSession = require('connect-pg-simple');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

const sessionHandler = (session) => {
    const pgs = pgSession(session);
    return new pgs({
        conString: process.env.DATABASE_URL,
        pool: pool,
        schemaName: process.env.DB,
        tableName: 'session',
      });
}
  
// pool.connect();
// const pool = new pg.Pool({
//     user: process.env.DB_USER,
//     host:process.env.DB_HOST,
//     database:process.env.DB,
//     password:process.env.DB_PW,
//     port:process.env.DB_PORT
// });

module.exports = sessionHandler;