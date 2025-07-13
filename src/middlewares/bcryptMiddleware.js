const bcrypt = require("bcrypt");
const saltRounds = 10;

var bcryptMiddleware = {
    comparePassword: (req, res, next) => {
      // Check password
      const callback = (err, isMatch) => {
        if (err) {
          console.error("Error bcrypt:", err);
          res.status(500).json(err);
        } else {
          if (isMatch) {
            next();
          } else {
            res.status(401).json({
              message: "Wrong password",
            });
          }
        }
      };
      bcrypt.compare(req.body.password, res.locals.hash, callback);
    }
  }
  
  module.exports=bcryptMiddleware;
  