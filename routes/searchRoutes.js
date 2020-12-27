const express = require("express");
const db = require("../models/index");
const searchController = require("../controllers/searchController");
const router = express.Router();
router.use("/search/js", express.static(__dirname));
router.get("/name", (req, res) => {
  const { value } = req.query;
  (async function () {
    try {
      const result = await searchController.handleSearchWithName(value);
      res.render("search", { data: result });
    } catch (error) {
      console.log(error);
    }
  })();
});
router.post("/price", (req, res) => {
  const { min, max } = req.query;
  (async function () {
    const result = await searchController.handleSearchWithPrice(min, max);
    res.json(result);
  })();
});
router.post("/type", (req, res) => {
  const { value } = req.query;
  (async function () {
    const result = await searchController.handleSearchWithType(value);
    res.json(result);
  })();
});
module.exports = router;
