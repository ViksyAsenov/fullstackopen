class InvalidToken extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidToken";
  }
}

module.exports = InvalidToken;
