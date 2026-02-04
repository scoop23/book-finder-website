const axios = require("axios")
require('dotenv').config();
const { fetchFromUrl } = require('./util.js');


const openLibUrl = process.env.OPEN_LIBRARY_URL;
 
async function getBookFromTitle(req, res, query, page) {
  return fetchFromUrl(
    req,
    res,
    openLibUrl,
    { 
      title : query,
      page : page
    }
  );
}
