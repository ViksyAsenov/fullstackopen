const express = require("express");
require("express-async-errors");

const blogsRouter = require("./controllers/blogs");

const unknownEndpoint = require("./util/middleware/unknownEndpoint");
const errorHandler = require("./util/middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
