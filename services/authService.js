const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError")
const db = require("../db.js");
const env = require("../env.js");

exports.register = async (data) => {
  const {username, password} = data;
  const [existingUsers] = await db.promise().query("SELECT username FROM users WHERE username = ?", [username]);

  if(existingUsers.length > 0){
    throw new ApiError(409, "Username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await db.promise().query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, passwordHash]);

  return {username};
}

exports.login = async (data) => {
  const {username, password} = data;
  const [users] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
  const user = users[0];

  if(!user){
    throw new ApiError(401, "Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if(!validPassword){
    throw new ApiError(401, "Invalid credentials");
  }

  const jwt_secret = env("JWT_KEY");
  const token = jwt.sign(
    {username: user.username},
    jwt_secret,
    {expiresIn:"3d"}
  );

  return {token};
}
