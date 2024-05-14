const Sequelize = require("sequelize");
const { dbUrl } = require("./config");

const sequelize = new Sequelize(dbUrl);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("connected to the db");
  } catch (error) {
    console.error(error);

    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
