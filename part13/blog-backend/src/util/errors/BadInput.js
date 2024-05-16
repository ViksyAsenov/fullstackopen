class BadInput extends Error {
  constructor(message) {
    super(message);
    this.name = "BadInput";
  }
}

module.exports = BadInput;
