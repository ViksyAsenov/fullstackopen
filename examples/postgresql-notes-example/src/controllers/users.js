const usersRouter = require("express").Router();

const { User, Note } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Note,
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

module.exports = usersRouter;
