const bcrypt = require("bcrypt");
const db = require("../db");
const path = require('path');
const fs = require('fs')
const ApiError = require('../utils/ApiError')

exports.getAllFiles = async (username) => {
  const [files] = await db.promise().query("SELECT * FROM uploads WHERE uploaded_by = ?", [username])
  return files;
}

exports.createUpload = async (data)=> {
  
  const {username, file, password} = data;
  let passwordHash = null;

  if(password){
    passwordHash = await bcrypt.hash(password, 10);
  }
  console.log(data);
  const uuid = file.filename.substring(0, 36);
  await db.promise().query("INSERT INTO uploads(uuid, file_name, file_size, file_location, password_hash, uploaded_by) values(?, ?, ?, ?, ?, ?)", [uuid, file.originalname, file.size, file.path, passwordHash, username]);
}

exports.getFile = async (uuid) => {
  const [files] = await db.promise().query("SELECT * FROM uploads WHERE uuid = ?", uuid);

  const file = files[0];

  return file;
}

exports.deleteFile = async (uuid) => {
  const file_location_list= await db.promise().query("SELECT file_location FROM uploads WHERE uuid = ? ", uuid);

  const file_location = file_location_list[0][0].file_location
  const filePath = path.join(process.cwd(), file_location);
  await fs.unlinkSync(filePath)

  await db.promise().query("DELETE FROM uploads WHERE uuid = ?", uuid);
}
