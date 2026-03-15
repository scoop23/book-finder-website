import axiosMain, { apiGet } from "./axios";

export const fetchBookByAuthor = async (searchText) => {
  return apiGet(`/search/author?q=${searchText}`);
};

export const fetchBookByAuthorWithTitle = async (author, searchText) => {
  return apiGet(`/search/author-title?p1=${searchText}&p2=${author}`);
};

export const fetchBookByTitle = async (searchText) => {
  return apiGet(`/search/title?q=${searchText}`);
};

export const fetchBookByTitleOL = async (searchText, page) => {
  return apiGet(`/opensearch/title?q=${searchText}&page=${page}`);
};

export const fetchBookByAuthorOL = async (searchText, page) => {
  return apiGet(`/opensearch/author?q=${searchText}&page=${page}`);
};

export const fetchBookAuthorAndTitleOL = async (searchText, page, author) => {
  return apiGet(`/opensearch/title-author?title=${searchText}&author=${author}&page=${page}`);
};

export const fetchWorks = async (workId) => {
  return apiGet(`/opensearch/work/${workId}`);
};

export const fetchQuotes = async () => {
  return apiGet(`/random/random-quote`);
};

export const fetchAuthors = async (authorId) => {
  return axiosMain.get(`/opensearch/authors/${authorId}`);
};

export const getGenre = async (genre) => {
  if (!genre) return;

  return apiGet(`/genres/${genre}`);
};

export const fetchRandomBook = async () => {
  return apiGet(`/random/random-books`);
};
