const jwt = require("jsonwebtoken");
const env = require("../env");

const authMiddleware = (req, res, next) => {
    try {
      const token = req.cookies.token;

      if(!token){
        return res.redirect("/auth/login");
      }

      const decodedToken = jwt.verify(token, env("JWT_KEY"));
      req.user = decodedToken;
      next();
    }catch{
      res.redirect("/auth/login");
    }
}

module.exports = authMiddleware;
