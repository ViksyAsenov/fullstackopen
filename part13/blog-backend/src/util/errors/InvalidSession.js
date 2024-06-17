class InvalidSession extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidSession";
  }
}

module.exports = InvalidSession;
