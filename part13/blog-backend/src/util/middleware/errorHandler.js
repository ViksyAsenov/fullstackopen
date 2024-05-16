const errorHandler = (error, req, res, next) => {
  if (error.name === "BadInput") {
    return res.json({ error: "Your input was invalid!" });
  }

  return res.json({ error: "Something went wrong!" });
};

module.exports = errorHandler;
