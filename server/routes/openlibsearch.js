const express = require('express');
const { getBookFromTitle } = require('./openlibsearch.js');
const router = express.Router();


router.get('/title', async (req, res) => {
  const query = req.query.q;
  const page = req.query.page;
  await getBookFromTitle(req, res, query,);
})


module.exports = router;
