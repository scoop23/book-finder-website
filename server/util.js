
const axios = require("axios")
require('dotenv').config();
const genres = require("../shared/constants/genres.json");


const apikey = process.env.API_KEY;
async function getTitleByAuthor(query, res) {
try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params : {
        q : `inauthor:${query}`,
        key : apikey
      }
    });
    
    // if(response.data) {
    //   const items = response.data.items;
    // }

    return res.json(response.data);
  } catch(err) {
    console.error('Error fetchinsg data from Google Books API:', err.message);
      if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    }
   res.status(500).json({ error: "FAILED TO FETCH DATA" });
  } 
}

async function getTitleAndAuthor(arr , res) {
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes" , {
      params : {
        q : `intitle:${arr[0]}+inauthor:${arr[1]}`,
        key : apikey,
        orderBy : `relevance`,
        langRestrict : `en` // for some reason doesn't work
      }
    })
    const url = new URL("https://www.googleapis.com/books/v1/volumes");
    // url.search = new URLSearchParams({
    //   q: `intitle:${arr[0]}+inauthor:${arr[1]}`,
    //   key: apikey,
    //   orderBy: "relevance",
    //   langRestrict : "en"
    // }).toString();

    // console.log(url.toString());


    return res.json(response.data) // sending the data to the frontend
  } catch(err) {
    console.error("Bro really? " , err)
    if(err.response){
      console.error('Status' , err.response.status)
      console.error('Data' , err.response.data)
    }
    res.status(500).json({error : "FAILED TO FETCH DATA"})
  }
}

async function getQuotes(res) {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");

    return res.json(response.data)
  } catch(e) {
    console.error("Error Fetching Quotes" , e);
  }
}

async function getRandomBooks(res) {
  
  const keywords = Object.keys(genres);
  const randomNum = Math.floor(Math.random() * keywords.length);

  const randomKeyword = keywords[randomNum];
  
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes" , {
      params : {
        q : `${randomKeyword}`
      }
    })

    return res.json(response.data);
  } catch(err) {
    if(err.response) {
      console.error("Data: " , err.response.data);
      console.error("Status: " , err.response.status);
    }
  }
}

async function getTitleName(query, res) {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes" , {
        params : {
          q : `intitle:${query}`,
          key : apikey
        }
      })

      return res.json(response.data);
      
    } catch(err) {
      if(err.response){
       console.error('Status :', err.response.status)
       console.error('Data :' , err.response.data);
      }
      res.status(500).json({ error : "FAILED TO FETCH DATA"});
    }
}

async function getGenre(genre, res) {
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes" , {
      params : {
        q : `subject:${genre}`,
      }
    });

    return res.json(response.data);
  } catch(err) {
    if(err.response) {
      console.error("Status: ",err.response.status)
      console.error("Data: ",err.response.data)
    }
    res.status(500).json({ error : "FAILED TO FETCH DATA" });
  }
}

module.exports = {getTitleByAuthor , getTitleName, getTitleAndAuthor , getQuotes , getGenre, getRandomBooks}