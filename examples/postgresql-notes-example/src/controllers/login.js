const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

const { secret } = require("../util/config");
const { User } = require("../models");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });

  const isPasswordCorrect = password === "secret";

  if (!user || !isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "Account disabled, please contact admin!",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, secret);

  res.json({ token, username, name: user.name });
});

module.exports = loginRouter;
