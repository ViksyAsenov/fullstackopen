const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const MissingToken = require("../errors/MissingToken");
const InvalidToken = require("../errors/InvalidToken");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), secret);
    } catch (error) {
      throw new InvalidToken("Invalid Token!");
    }
  } else {
    throw new MissingToken("Missing Token!");
  }

  next();
};

module.exports = tokenExtractor;
