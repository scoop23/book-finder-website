const express = require('express');
const router = express.Router();
const { getTitleByAuthor, getTitleAndAuthor, getTitleName } = require('../util');

router.get("/author", async (req, res) => { // presumably, /search/author
  const query = req.query.q; // query is the /api/search?q=(req.query.q)
  const page = parseInt(req.query.page) || 1;
  await getTitleByAuthor(query, res, page);
});

router.get("/author-title", async (req, res) => {
  // query is the /api/search?q=(req.query.q)
  const title = req.query.p1;
  const author = req.query.p2;
  const page = req.query.page;
  getTitleAndAuthor([title, author], res, page)
});

router.get("/title", async (req, res) => {
  const query = req.query.q; // query is the /api/search?q=(req.query.q)
  const page = parseInt(req.query.page) || 1; // get the page and parseINT
  await getTitleName(query, res, page); // send in the proxy api
});

module.exports = router;  
