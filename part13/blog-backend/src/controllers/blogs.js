const blogsRouter = require("express").Router();

const { Op } = require("sequelize");
const { Blog, User } = require("../models");

const BadInput = require("../util/errors/BadInput");
const InvalidUser = require("../util/errors/InvalidUser");
const tokenExtractor = require("../util/middleware/tokenExtractor");
const checkSession = require("../util/middleware/checkSession");

blogsRouter.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: { [Op.iLike]: `%${req.query.search}%` },
      },
      {
        author: { [Op.iLike]: `%${req.query.search}%` },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"],
    },
    where,
    order: [["likes", "DESC"]],
  });

  res.json(blogs);
});

blogsRouter.post("/", tokenExtractor, checkSession, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });

    res.json(blog);
  } catch (error) {
    throw new BadInput(error);
  }
});

blogsRouter.delete("/:id", tokenExtractor, checkSession, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.sendStatus(404);
  }

  if (blog.userId !== req.decodedToken.id) {
    throw new InvalidUser("This blog wasn't created by you");
  }

  await blog.destroy();

  res.sendStatus(204);
});

blogsRouter.put("/:id", tokenExtractor, checkSession, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    try {
      blog.likes = req.body.likes;

      await blog.save();

      res.json(blog);
    } catch (error) {
      throw new BadInput(error);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = blogsRouter;
