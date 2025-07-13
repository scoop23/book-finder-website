import "../../App.css";
import axios from "axios";

export const fetchBookByAuthor = async (searchText) => {
  const response = await axios.get(
    `http://localhost:8080/api/search-author?q=${searchText}`
  );
  return response.data;
};

export const fetchBookByAuthorWithTitle = async (author, searchText) => {
  const response = await axios.get(
    `http://localhost:8080/api/search-author-title?p1=${searchText}&p2=${author}`
  );
  return response.data;
};

export const fetchBookByTitle = async (searchText) => {
  const response = await axios.get(
    `http://localhost:8080/api/search-title?q=${searchText}`
  );
  return response.data;
};

// find free api for quotes
export const fetchQuotes = async () => {
  const response = await axios.get(`http://localhost:8080/api/quotes/random`);
  return response.data;
};

export const getGenre = async (genre) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/genre/${genre}`);

    return response.data;
  } catch(err) {
    if(err.response) {
      console.error("Data, ", err.response.data)
      console.error("Status, ", err.response.status)
    }
  }
}