const fileService = require("../services/fileService")
const ApiError = require("../utils/ApiError")
const path = require("path");
const bcrypt = require("bcrypt");

exports.showUpload = async(req, res) => {
     res.render("pages/upload", {username: req.user.username}); 
   
}

exports.showDownload = async(req, res, next) => {
  try{
    const uuid = req.params.uuid;
    const file = await fileService.getFile(uuid);
    if(!file){
      throw new ApiError(404, "No file found");
    }
    let hasPassword = false;
    if(file.password_hash){
      hasPassword = true;
    }
console.log(file)    
    res.render("pages/file", {file_uuid: file.uuid,file_name:file.file_name, file_size: file.file_size,uploaded_at: file.uploaded_at, hasPassword:hasPassword });
  }
  catch(error){
    next(error)
  }
}

exports.create = async(req, res, next) => {
  try{
    if(!req.file){
      throw new ApiError(400, "File not found")
    }

    await fileService.createUpload({password: req.body.password, file:req.file, username: req.user.username})
    res.redirect("/dashboard")
  }catch(error){
    next(error);
  }
}

exports.download = async(req, res, next) => {
  try{
    const file = await fileService.getFile(req.params.uuid);
    
    if(!file){
      throw new ApiError(404, "File not found")
    }

    if(file.password_hash){
      const valid = await bcrypt.compare(req.body.password, file.password_hash);
      if(!valid){
        throw new ApiError(401, "wrong password");
      }
    }

    const filePath = path.join(process.cwd(), file.file_location);

    res.download(filePath, file.file_name);
  }catch(e){
    next(e);
  }
}

exports.delete = async (req, res, next) => {
  try{
    const file = await fileService.getFile(req.params.uuid);
    if(!file){
      throw new ApiError(404, "File not found");
    }

    if(file.uploaded_by != req.user.username){
      throw new ApiError(403, "Access denied");
    }

    await fileService.deleteFile(req.params.uuid);
    res.redirect("/dashboard");
  }
  catch(e){
    next(e)
  }
}
