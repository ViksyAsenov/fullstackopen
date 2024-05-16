const blogsRouter = require("express").Router();
const { Blog } = require("../models");
const BadInput = require("../util/errors/BadInput");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.json(blog);
  } catch (error) {
    throw new BadInput();
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    await blog.destroy();

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    try {
      blog.likes = req.body.likes;

      await blog.save();

      res.json(blog);
    } catch (error) {
      throw new BadInput();
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = blogsRouter;
