const { Note } = require("../../models");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

module.exports = noteFinder;
