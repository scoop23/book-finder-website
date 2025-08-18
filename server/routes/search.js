const express = require('express');
const router = express.Router();
const { getTitleByAuthor, getTitleAndAuthor, getTitleName } = require('../util');

router.get("/author", async (req , res) => { // presumably, /search/author
  const query = req.query.q; // query is the /api/search?q=(req.query.q)
  await getTitleByAuthor(query , res);
});

router.get("/author-title", async (req , res) => {
   // query is the /api/search?q=(req.query.q)
  const title = req.query.p1;
  const author = req.query.p2;
  getTitleAndAuthor([title , author] , res)
});

router.get("/title", async (req , res) => {
  const query = req.query.q; // query is the /api/search?q=(req.query.q)
  await getTitleName(query , res);
});

module.exports = router;