const pg = require('pg');
const pool = new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"todoapp",
    password:"123",
    port:5432
});

module.exports = pool;