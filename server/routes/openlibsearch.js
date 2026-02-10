const express = require('express');
const { getBookFromTitle } = require('../openLibUtil.js');
const router = express.Router();


router.get('/title', async (req, res) => {
  const { q, page } = req.query;
  console.log("API HIT", req.query, " Requested at  ", new Date().toISOString());
  await getBookFromTitle(req, res, q, page);
})

router.get('/author', async (req, res) => {
  const { q } = req.query;

  console.log("API HIT", req.query, " Requested at ", new Date().toISOString());
})

router.get("/work/:id", async (req, res) => {

})


module.exports = router;
