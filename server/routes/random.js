const express = require('express');
const router = express.Router();
const { getQuotes, getRandomBooks } = require('../util')

router.get("/random-quote", async (res) => {
  await getQuotes(res);
});

// get random books for now, because i dont know how to get popular books from the google books api
router.get("/random-books", async (res) => {
  await getRandomBooks(res);
})

module.exports = router;
