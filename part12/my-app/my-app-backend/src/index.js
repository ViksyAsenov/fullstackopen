const http = require("http");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3001;

const requestListener = function (req, res) {
  const data = {
    success: true,
    number: Math.floor(Math.random() * 100) + 1,
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);

  res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
