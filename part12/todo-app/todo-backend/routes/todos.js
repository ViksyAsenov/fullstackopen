const express = require("express");
const { Todo } = require("../mongo");
const redis = require("../redis/index");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const currentCount = (await redis.getAsync("count")) | 0;
  await redis.setAsync("count", parseInt(currentCount) + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    req.todo = await Todo.findById(id);
  } catch (error) {
    console.error(error);
    return res.sendStatus(404);
  }

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo;
  if (!todo) {
    res.sendStatus(404);
  }

  res.json(todo); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = req.todo;

  if (!todo) {
    return res.sendStatus(404);
  }

  const newText = req.body.text;

  if (!newText) {
    return res.sendStatus(400);
  }

  todo.text = newText;
  await todo.save();
  res.json(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
