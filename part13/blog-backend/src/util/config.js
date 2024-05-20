require("dotenv").config();

module.exports = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 3001,
  secret: process.env.SECRET,
};
