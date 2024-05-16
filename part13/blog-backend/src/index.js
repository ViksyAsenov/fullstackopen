const app = require("./app");
const { port } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const start = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();
