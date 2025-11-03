// apparrently this is called a 'PROXY API' this api acts as a backend for my frontend
// hence the terminology. or a BFF Backend-For-Frontend it acts as a middleman for my frontend 
const { getTitleByAuthor , getTitleName, getTitleAndAuthor, getQuotes, getGenre, getRandomBooks } = require("./util")
const express = require("express");
const app = express();
const port = 8080;
const axios = require("axios");
const cors = require("cors");

const corsOptions = {
  origin : ["http://localhost:5173" , "https://scoop23.github.io", "http://localhost:5174"],
};

app.use(cors(corsOptions));

app.listen(port , () => {
  console.log("Server started on port " + port);
});

const searchRouter = require('./routes/search');
const genreRouter = require('./routes/genres');
const randomsRouter = require('./routes/random')
app.use('/search' , searchRouter);
app.use('/genres' , genreRouter);
app.use('/random' , randomsRouter);



