const pg = require('pg');
const pool = new pg.Pool({
    user:"todoapp_9a9i",
    host:"dpg-cfomioqrrk0fd9pr7cag-a",
    database:"todoapp_9a9i_user",
    password:"jkXmEnPRSOdkFcOc7v3epksRVV5jKCsP",
    port:5432
});

module.exports = pool;