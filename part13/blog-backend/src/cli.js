require("dotenv").config();

const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL);

const main = async () => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    console.log(blogs);

    sequelize.close();
  } catch (error) {
    console.error(error);
  }
};

main();
