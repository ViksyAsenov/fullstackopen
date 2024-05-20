const usersRouter = require("express").Router();
const { User, Blog } = require("../models");
const BadInput = require("../util/errors/BadInput");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });

  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    throw new BadInput(error);
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
