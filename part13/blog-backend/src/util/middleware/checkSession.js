const { Session } = require("../../models");
const { Op } = require("sequelize");
const InvalidSession = require("../errors/InvalidSession");

const checkSession = async (req, res, next) => {
  const session = await Session.findOne({
    where: {
      userId: req.decodedToken.id,
      expires: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!session) {
    throw new InvalidSession("Your session has expired!");
  }

  next();
};

module.exports = checkSession;
