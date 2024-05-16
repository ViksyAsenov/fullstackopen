const Note = require("./note");
const User = require("./user");

User.hasMany(Note);
Note.belongsTo(User);

Note.sync();
User.sync();

module.exports = {
  Note,
  User,
};
