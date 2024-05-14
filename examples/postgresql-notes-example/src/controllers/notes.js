const router = require("express").Router();

const { Note } = require("../models");
const noteFinder = require("../util/middleware/noteFinder");

router.get("/", async (req, res) => {
  const notes = await Note.findAll();

  res.json(notes);
});

router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.json(note);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    res.json(note);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    await req.note.destroy();

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", noteFinder, async (req, res) => {
  const note = req.note;

  if (note) {
    note.important = req.body.important;

    await note.save();

    res.json(note);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
