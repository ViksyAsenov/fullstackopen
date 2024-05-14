require("dotenv").config();

const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_URL);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);
Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.json(blog);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    await blog.destroy();

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
