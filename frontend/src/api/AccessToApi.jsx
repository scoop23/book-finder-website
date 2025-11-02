import { apiGet } from "./axios";

export const fetchBookByAuthor = async (searchText) => {
  return apiGet(`/search/author?q=${searchText}`);
}

export const fetchBookByAuthorWithTitle = async (author , searchText) => {
  return apiGet(`/search/author-title?p1=${searchText}&p2=${author}`);
}

export const fetchBookByTitle = async (searchText) => {
  return apiGet(`http://localhost:8080/search/title?q=${searchText}`)
};

// find free api for quotes
export const fetchQuotes = async () => {
  return apiGet(`http://localhost:8080/random/random-quote`);
};

export const getGenre = async (genre) => {
  if(!genre) {
    return;
  }

  return apiGet(`http://localhost:8080/genres/${genre}`);
}

export const fetchRandomBook = async () => {
  return apiGet("http://localhost:8080/random/random-books");
}
