import axios from "axios";
import { apiGet } from "./axios";


export const fetchBookByAuthor = async (searchText) => {
  return apiGet(`/search/author?q=${searchText}`);
}


export const fetchBookByAuthorWithTitle = async (author, searchText) => {
  try {
    const response = await axios.get(`http://localhost:8080/search/author-title?p1=${searchText}&p2=${author}`);
    return response.data;
  } catch(error) {
    if(error.response) {
      console.error("Data: " , error.response.data);
      console.error("Status: " , error.response.status);
      return;
    }
    return;
  }  
};

export const fetchBookByTitle = async (searchText) => {
  // const response = await axios.get(
  //   `http://localhost:8080/search/title?q=${searchText}`
  // );
  // return response.data;
  return apiGet(`http://localhost:8080/search/title?q=${searchText}`)
};

// find free api for quotes
export const fetchQuotes = async () => {
  const response = await axios.get(`http://localhost:8080/random/random-quote`);
  return response.data;
};

export const getGenre = async (genre) => {

  if(!genre) {
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/genres/${genre}`);

    return response.data;
  } catch(err) {
    if(err.response) {
      console.error("Data, ", err.response.data)
      console.error("Status, ", err.response.status)
    }
  }
}

export const fetchRandomBook = async () => {
  try {
    const response = await axios.get("http://localhost:8080/random/random-books");

    return response.data;
  } catch(err) {
    if(err.response) {
      console.error("Data, ", err.response.data)
      console.error("Status, ", err.response.status)
    }
  }
}