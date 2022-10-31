const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ethen",
    password: "docker",
    host: "localhost",
    port: 5432,
    database: "dungeon"
});

module.exports = pool;