require('dotenv').config();
const dbstring = process.env.PG_KEY;

const pgp = require('pg-promise')();
const db = pgp(dbstring);


module.exports = { db };
