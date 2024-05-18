const express = require("express");
require("express-async-errors");

const blogsRouter = require("./controllers/blogs");

const unknownEndpoint = require("./util/middleware/unknownEndpoint");
const errorHandler = require("./util/middleware/errorHandler");
const usersRouter = require("./controllers/users");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
