const express = require('express');
const { getBookFromTitle } = require('../openLibUtil.js');
const router = express.Router();


router.get('/title', async (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  console.log("API HIT", req.query, " Requested at  ", new Date().toISOString());
  await getBookFromTitle(req, res, query, page);
})


module.exports = router;
