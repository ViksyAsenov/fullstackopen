class MissingToken extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingToken";
  }
}

module.exports = MissingToken;
