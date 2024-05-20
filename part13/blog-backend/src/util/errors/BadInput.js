class BadInput extends Error {
  constructor(error) {
    super("Bad Input!");
    this.name = "BadInput";
    this.errors = error.errors;
  }
}

module.exports = BadInput;
