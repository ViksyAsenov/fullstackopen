const loginRouter = require("express").Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { secret } = require("../util/config");
const InvalidUser = require("../util/errors/InvalidUser");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  const isPasswordCorrect = password === "secret";

  if (!user || !isPasswordCorrect) {
    throw new InvalidUser("Invalid username or password!");
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, secret);

  res.json({ token, username, name: user.name });
});

module.exports = loginRouter;
