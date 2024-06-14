const { User, ReadingList } = require("../models");
const BadInput = require("../util/errors/BadInput");
const InvalidUser = require("../util/errors/InvalidUser");
const tokenExtractor = require("../util/middleware/tokenExtractor");

const readingListRouter = require("express").Router();

readingListRouter.post("/", async (req, res) => {
  try {
    const readingListEntry = await ReadingList.create(req.body);

    res.json(readingListEntry);
  } catch (error) {
    throw new BadInput(error);
  }
});

readingListRouter.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const readingListEntry = await ReadingList.findByPk(req.params.id);

  if (user.id !== readingListEntry.userId) {
    throw new InvalidUser("This blog wasn't marked by you");
  }

  try {
    readingListEntry.read = req.body.read;

    await readingListEntry.save();
  } catch (error) {
    throw new BadInput(error);
  }

  res.json(readingListEntry);
});

module.exports = readingListRouter;
