const authService = require('../services/authService.js')

exports.renderLogin = (req, res) => {
    res.render("auth/login");
}

exports.renderRegister = (req, res) => {
  res.render("auth/register");
}

exports.register = async(req, res, next) => {
  let data = req.body;
  try{
    await authService.register(data);
    res.redirect("/auth/login");
  }
  catch(e){
    next(e);
  }

}

exports.login = async(req, res, next) => {
  let data = req.body;
  try{
    const result = await authService.login(data);

    res.cookie("token", result.token, {
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge: 60 * 60 * 1000 //1h
    });
    res.redirect("/");
  }catch(e){
    next(e);
  }
}
