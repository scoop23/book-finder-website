const express = require('express');
const { getBookFromSearch } = require('../openLibUtil.js');
const router = express.Router();


router.get('/:type', async (req, res) => {
  const { q, page, author } = req.query;
  const { type } = req.params;

  console.log("API HIT", req.query, " Requested at  ", new Date().toISOString());
  await getBookFromSearch(req, res, { q, page, type, author });
})

router.get("/work/:id", async (req, res) => {

})


module.exports = router;
