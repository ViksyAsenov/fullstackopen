const usersRouter = require("express").Router();
const { User, Blog } = require("../models");
const BadInput = require("../util/errors/BadInput");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Blog,
        as: "marked_blogs",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        through: {
          attributes: ["id", "read"],
          where,
        },
      },
    ],
  });

  res.json(user);
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
