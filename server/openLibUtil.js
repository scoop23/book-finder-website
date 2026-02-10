const axios = require("axios")
require('dotenv').config();
const { fetchFromUrl } = require('./util.js');


const openLibUrl = process.env.OPEN_LIBRARY_URL;
const myEmail = process.env.MY_EMAIL;

const axiosBase = axios.create({
  baseURL: openLibUrl,
  headers: {
    "User-Agent": `BookFinderWeb/1.0 (${myEmail})`,
    "Accept": "application/json"
  },
  timeout: 10000,
})

const myCache = new Map();

async function getBookFromTitle(req, res, query, page) {
  const cacheKey = `${query}|${page}`; // bind the page and the title/query
  try {
    if (myCache.has(cacheKey)) {
      return res.json(myCache.get(cacheKey));
    }

    console.log(cacheKey)

    const openLibEndPoints = {

    }

    const responseData = await axiosBase.get("/search.json", { // binds the /search.json in to the url
      params: { q: query, page }
    })

    myCache.set(cacheKey, responseData.data); // store in cache

    setTimeout(() => myCache.delete(cacheKey), 5 * 60 * 1000); // delete after 5 mins?
    return res.send(responseData.data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


module.exports = { getBookFromTitle };
