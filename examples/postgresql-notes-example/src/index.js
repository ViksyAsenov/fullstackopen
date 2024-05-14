const express = require("express");
const app = express();

const { port } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const notesRouter = require("./controllers/notes");

app.use(express.json());

app.use("/api/notes", notesRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();
