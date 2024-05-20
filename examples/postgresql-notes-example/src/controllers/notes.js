const notesRouter = require("express").Router();

const { Op } = require("sequelize");
const { Note, User } = require("../models");
const noteFinder = require("../util/middleware/noteFinder");
const tokenExtractor = require("../util/middleware/tokenExtractor");

notesRouter.get("/", async (req, res) => {
  const where = {};

  if (req.query.important) {
    where.important = req.query.important === "true";
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    };
  }

  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });

  res.json(notes);
});

notesRouter.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });

    res.json(note);
  } catch (error) {
    res.status(400).json({ error });
  }
});

notesRouter.get("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    res.json(note);
  } else {
    res.sendStatus(404);
  }
});

notesRouter.delete("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    await req.note.destroy();

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

notesRouter.put("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    try {
      note.important = req.body.important;

      await note.save();

      res.json(note);
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = notesRouter;
