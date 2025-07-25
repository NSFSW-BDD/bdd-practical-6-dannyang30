require("dotenv").config();

const jwt = require("jsonwebtoken");

// Set JWT Configuration
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

var jwtMiddleware = {
  //////////////////////////////////////////////////////
  // MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
  //////////////////////////////////////////////////////
  generateToken: (req, res, next) => {
    const payload = {
      userid: res.locals.userid,
      role: res.locals.role,
      timestamp: new Date(),
    };

    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };

    const callback = (err, token) => {
      if (err) {
        console.error("Error jwt:", err);
        res.status(500).json(err);
      } else {
        res.locals.token = token;
        next();
      }
    };

    // Generate a JWT token with the provided payload and duration
    jwt.sign(payload, secretKey, options, callback);
  },
  sendToken: (req, res, next) => {
    res.status(200).json({
      message: res.locals.message,
      token: res.locals.token,
    });
  },
  verifyToken: (req, res, next) => {
    // Get the token from the request headers
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Token is valid, store the decoded information for later use
      res.locals.userid = decoded.userid;
      res.locals.role = decoded.role;
      res.locals.tokenTimestamp = decoded.timestamp;
      // Move to the next middleware or route handler
      next();
    };
    // Verify the token
    jwt.verify(token, secretKey, callback);
  },
  verifyAdmin: (req, res, next) => {
    if (res.locals.role == "admin") {
      next();
    } else {
      return res.status(401).json({ error: "Invalid Access Role" });
    }
  },
};

module.exports = jwtMiddleware;
