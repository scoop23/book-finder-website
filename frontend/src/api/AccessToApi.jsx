import { apiGet } from "./axios";

export const fetchBookByAuthor = async (searchText) => {
  return apiGet(`/search/author?q=${searchText}`);
}

export const fetchBookByAuthorWithTitle = async (author, searchText) => {
  return apiGet(`/search/author-title?p1=${searchText}&p2=${author}`);
}

export const fetchBookByTitle = async (searchText) => {
  return apiGet(`http://localhost:8080/search/title?q=${searchText}`);
};

export const fetchBookByTitleOL = async (searchText, page) => {
  return apiGet(`http://localhost:8080/opensearch/title?q=${searchText}&page=${page}`);
  //http://localhost:8080/opensearch/title?q=harry
};

export const fetchBookByAuthorOL = async (searchText, page) => {
  return apiGet(`http://localhost:8080/opensearch/author?q=${searchText}&page=${page}`);
};

export const fetchBookAuthorAndTitleOL = async (searchText, page, author) => {
  return apiGet(`http://localhost:8080/opensearch/title-author?title=${searchText}&author=${author}&page=${page}`);
};

export const fetchWorks = async (workId) => {
  return apiGet(`http://localhost:8080/opensearch/work/workId?q=${workId}`); // something like this?
}

// find free api for quotes
export const fetchQuotes = async () => {
  return apiGet(`http://localhost:8080/random/random-quote`);
};

export const getGenre = async (genre) => {
  if (!genre) {
    return;
  }

  return apiGet(`http://localhost:8080/genres/${genre}`);
}

export const fetchRandomBook = async () => {
  return apiGet("http://localhost:8080/random/random-books");
}
