const usersRouter = require("express").Router();
const { User } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({});

  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

usersRouter.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user && req.body.username) {
    user.username = req.body.username;

    await user.save();

    res.json(user);
  } else {
    res
      .status(404)
      .json({ error: "User not found or new username is invalid!" });
  }
});

module.exports = usersRouter;
