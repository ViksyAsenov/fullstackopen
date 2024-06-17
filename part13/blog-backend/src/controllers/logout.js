const checkSession = require("../util/middleware/checkSession");
const tokenExtractor = require("../util/middleware/tokenExtractor");
const { Session } = require("../models");
const logoutRouter = require("express").Router();

logoutRouter.post("/", tokenExtractor, checkSession, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  });

  res.sendStatus(204);
});

module.exports = logoutRouter;
