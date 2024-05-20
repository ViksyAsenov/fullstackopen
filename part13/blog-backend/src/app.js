const express = require("express");
require("express-async-errors");

const unknownEndpoint = require("./util/middleware/unknownEndpoint");
const errorHandler = require("./util/middleware/errorHandler");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const authorsRouter = require("./controllers/authors");
const loginRouter = require("./controllers/login");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
