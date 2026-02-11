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

async function getBookFromTitle(req, res, query, page, type) {
  const cacheKey = `${type}|${query}|${page}`; // bind the page and the title/query
  try {
    if (myCache.has(cacheKey)) {
      return res.json(myCache.get(cacheKey));
    }

    const params = { page };

    switch (type) {
      case "title":
        params.q = query;
        break;
      case "author":
        params.author = query;
        break;
      default:
        return res.status(400).json({ error: "Invalid search type" });
    }

    const responseData = await axiosBase.get("/search.json", { params }) // binds the /search.json in to the url

    myCache.set(cacheKey, responseData.data); // store in cache

    setTimeout(() => myCache.delete(cacheKey), 5 * 60 * 1000); // delete after 5 mins?
    return res.send(responseData.data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


module.exports = { getBookFromTitle };
