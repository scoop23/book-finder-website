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

async function getBookFromSearch(req, res, search) {
  const cacheKey = `${search.type}|${search.q}|${search.page}`; // bind the page and the title/query
  const limit = 30;
  try {
    if (myCache.has(cacheKey)) {
      return res.json(myCache.get(cacheKey));
    }

    const params = { page: search.page, limit };

    switch (search.type) {
      case "title":
        params.title = search.q;
        break;
      case "author": // if author then { author : query, page }
        params.author = search.q;
        break;
      case "title-author":
        params.title = search.q;
        params.author = search.author;
        break;
      default:
        return res.status(400).json({ error: "Invalid search type" });
    };

    const responseData = await axiosBase.get("/search.json", { params }) // binds the /search.json in to the url

    myCache.set(cacheKey, responseData.data); // store in cache

    setTimeout(() => myCache.delete(cacheKey), 5 * 60 * 1000); // delete after 5 mins?
    return res.send(responseData.data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


module.exports = { getBookFromSearch };
