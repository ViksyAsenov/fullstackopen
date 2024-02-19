const express = require("express");
const redis = require("../redis/index");
const router = express.Router();

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistic", async (_req, res) => {
  const count = (await redis.getAsync("count")) | 0;
  res.json({
    added_todos: count,
  });
});

module.exports = router;
