const loginRouter = require("express").Router();
const { User, Session } = require("../models");
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

  if (user.disabled) {
    throw new InvalidUser("Your account has been disabled");
  }

  const isPasswordCorrect = password === "secret";

  if (!user || !isPasswordCorrect) {
    throw new InvalidUser("Invalid username or password!");
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, secret);

  await Session.destroy({
    where: {
      userId: user.id,
    },
  });

  await Session.create({
    userId: user.id,
    token,
  });

  res.json({ token, username, name: user.name });
});

module.exports = loginRouter;
