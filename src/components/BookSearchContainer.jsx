// .. MAIN 

import React, { useEffect, useReducer } from "react";
import SearchBar from "./SearchBar";
import "../App.css";
import BookResults from "./BookResults";
import Loading from "./Loading";
import MainPage from "./MainPage";
import {
  fetchBookByAuthor,
  fetchBookByTitle,
  fetchBookByAuthorWithTitle,
  fetchQuotes,
  getGenre
} from "./api/AccessToApi";
import CarouselA from "./carousels/CarouselA";

// TODO: DISPLAY THE DATA ON THE CAROUSELS
// TODO: CREATE A STATE FOR A GENRE AND THEN CREATE A GET ROUTE ON THE PROXY BACKEND

const BookSearchContainer = () => {
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
    carouselAData : []
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
    }
  }
  const [state, dispatch] = useReducer(reducer, STATE); //usereducer

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (state.searchType.includes(null)) {
        if (state.searchText.trim() !== "") {
          if (state.searchType[1] === "author") {
            console.log("Fetching Titles with authorname");
            // setBookData(await fetchBookByAuthor(state.searchText));
            dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByAuthor(state.searchText)})
          } else if (state.searchType[0] === "title") {
            console.log("Fetching titles with titlename");
            // setBookData(await fetchBookByTitle(state.searchText));
            dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByTitle(state.searchText)})
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
        dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByAuthorWithTitle(state.author , state.searchText)})
      }
    }, 1000);
    return () => clearTimeout(delay); // cleanup debounce
  }, [state.searchText, state.searchType, state.author]); 

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetchQuotes();
        if (response && response.length > 0) {
          dispatch({ type : "SET_QUOTE_DATA" , payload : response })
        }
      } catch (e) {
        console.error("Error Fetching Quotes", e);
      }
    };
    getQuote();
  }, []);

  useEffect(() => {
    const getGenreFromAPI = async () => {
      try {
        const response = await getGenre(state.genreTag);
        dispatch({ type : "SET_GENRE_DATA" ,  payload : response});
      } catch(err) {
        if(err.response) {
          console.error("Data: ", err.response.data);
          console.error("Status: ", err.response.status);
        }
      }
    }
    
    getGenreFromAPI();
  }, [state.genreTag])

  // debouncing
  // fetchBookByAuthor(apiKey, searchText);
  // bookApi.fetchBookByTitle(searchText, setBookData);
  // fetchBookByAuthor(searchText); // moved to backend for security
  // TODO: WILL ADD A LANDING/START PAGE?

  return (
    <>
      <div className="main-container flex flex-col justify-center items-center w-full h-full gap-4">
        <div className="inner-main w-full max-w-[1280px] min-h-[780px] rounded-[10px] mx-auto p-4">
          <SearchBar
            dispatch={dispatch} // send useReducer dispatch
            state={state} // the state
          />
          {state.bookData ? (
            <div className="inner-book-result-container p-2 min-w-full flex items-center max-w-[1280px] justify-center">
              <BookResults data={state.bookData} />
            </div>
          ) : state.quoteData ? (
              <MainPage data={state.bookData} quoteData={state.quoteData} state={state} dispatch={dispatch}/>
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookSearchContainer;
