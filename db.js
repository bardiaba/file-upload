const mysql = require("mysql2");
const env = require("./env.js");

const db_host = env("DB_HOST");
const db_user = env("DB_USER");
const db_password = env("DB_PASSWORD");
const db_name = env("DB_NAME");

const pool = mysql.createPool({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_name,

  waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
