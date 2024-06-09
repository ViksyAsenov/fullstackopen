const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      validate: {
        isCurrentYearOrEarlier(value) {
          if (value < 1991 || value > new Date().getFullYear()) {
            throw new Error(
              "Year cannot be greater than the current or older than 1991"
            );
          }
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
