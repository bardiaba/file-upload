require("dotenv").config();

const env = (key, default_value) => {
  return process.env[key] || default_value;
}

module.exports = env;

