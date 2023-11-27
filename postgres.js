const pgp = require("pg-promise")();

const connection = {
    host: "localhost",
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 30,
};
const db = pgp(connection);

module.exports = db;
