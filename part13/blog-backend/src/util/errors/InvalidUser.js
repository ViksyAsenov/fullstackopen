class InvalidUser extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidUser";
  }
}

module.exports = InvalidUser;
