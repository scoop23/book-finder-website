// apparrently this is called a 'PROXY API' this api acts as a backend for my frontend
// hence the terminology. or a BFF Backend-For-Frontend it acts as a middleman for my frontend 
const { getTitleByAuthor, getTitleName, getTitleAndAuthor, getQuotes, getGenre, getRandomBooks } = require("./util")
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 8080;
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173", "https://scoop23.github.io", "http://localhost:5174"],
};
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 20,
  message: "Too many Request.."
})

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("Server started on port " + port);
});

const searchRouter = require('./routes/search');
const genreRouter = require('./routes/genres');
const randomsRouter = require('./routes/random')
const openLibRouter = require('./routes/openlibsearch');

app.use('/search', limiter, searchRouter);
app.use('/genres', genreRouter);
app.use('/random', randomsRouter);
app.use('/opensearch', limiter, openLibRouter);





