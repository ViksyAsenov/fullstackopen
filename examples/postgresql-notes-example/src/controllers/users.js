const usersRouter = require("express").Router();

const tokenExtractor = require("../util/middleware/tokenExtractor");
const isAdmin = require("../util/middleware/isAdmin");

const { User, Note, Team } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

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

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

usersRouter.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = usersRouter;
