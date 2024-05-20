const errorHandler = (error, req, res, next) => {
  if (error.name === "BadInput") {
    return res
      .status(400)
      .json({ errors: error.errors.map((error) => error.message) });
  }

  if (error.name === "InvalidUser") {
    return res.status(401).json({ error: error.message });
  }

  if (error.name === "MissingToken") {
    return res.status(401).json({ error: error.message });
  }

  if (error.name === "InvalidToken") {
    return res.status(401).json({ error: error.message });
  }

  return res.status(500).json({ error: "Something went wrong!" });
};

module.exports = errorHandler;
