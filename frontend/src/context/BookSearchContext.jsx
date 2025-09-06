import React from 'react'
import { useReducer, useEffect } from 'react';
import { createContext } from 'react'
import {
  fetchBookByAuthor,
  fetchBookByTitle,
  fetchBookByAuthorWithTitle,
} from "@/api/AccessToApi.jsx";

export const BookSearchContext = createContext(null);

const BookSearchProvider = ({ children }) => {
  const STATE = {
    searchText: "",
    author: "",
    searchType: [null, null],
    bookData: null,
    quoteData: null,
    isLoading: false,
    mainPageData: null,
    genreData : [],
    genreTag : "Fiction", // default to fiction
    carouselAData : [],
    randomBook : null
  };

  function reducer(state, action) {
    switch (action.type) {              //copy the whole state 
      case "SET_SEARCH_TEXT": { return {...state, searchText: action.payload,}; }
      case "SET_AUTHOR_TEXT": { return {...state, author: action.payload,}; }
      case "SET_SEARCH_TYPE": {
        const newType = [...state.searchType]; // create a copy of the searchType
        newType[action.payload.index] = action.payload.value; // then update the value depending on the payload
        return { ...state, searchType : newType,} // return the new values in the state
      } 
      case "SET_BOOK_DATA" : { return { ...state, bookData : action.payload}; }
      case "SET_QUOTE_DATA" : { return {...state, quoteData : action.payload}; }
      case "SET_GENRE_DATA" : { return {...state, genreData : action.payload}; }
      case "SET_GENRE" : { return {...state , genreTag : action.payload}; }
      case "SET_CAROUSELA_DATA" : { return {...state , carouselAData : action.payload};}
      case "SET_RANDOM_BOOK" : { return {...state , randomBook : action.payload}; }
      default : return state
    }
  }
  const [state, dispatch] = useReducer(reducer, STATE); //usereducer
  
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (state.searchType.includes(null)) {
        if (state.searchText.trim() !== "") {
          if (state.searchType[1] === "author") {
            console.log("Fetching Titles with authorname");
            // dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByAuthor(state.searchText)});
          } else if (state.searchType[0] === "title") {
            console.log("Fetching titles with titlename");
            // dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByTitle(state.searchText)});
          }
        }
      } else if (
        // Basically if the searchType arr is full
        state.searchType.length === 2 &&
        state.searchType[0] &&
        state.searchType[1] &&
        state.searchText.trim() !== ""
      ) {
        console.log("Fetching titles with matching authorname");
        // setBookData(await fetchBookByAuthorWithTitle(state.author, state.searchText));
        // dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByAuthorWithTitle(state.author , state.searchText)})
      }
    }, 1000);
    return () => clearTimeout(delay); // cleanup debounce
  }, [state.searchText, state.searchType, state.author]);   

  return (
    <BookSearchContext.Provider value={{ state , dispatch }}>
      {children}
    </BookSearchContext.Provider>
  )
}

export default BookSearchProvider;
