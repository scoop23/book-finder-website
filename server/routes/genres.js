const express = require('express');
const { getGenre } = require('../util');
const router = express.Router();

router.get("/:genre" , async (req, res) => {
  const genre = req.params.genre;
  await getGenre(genre, res)
});

module.exports = router;

