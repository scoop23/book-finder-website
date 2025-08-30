// .. MAIN 
import { Suspense, useCallback, useEffect, useReducer } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import "../App.css";
import BookResults from "./BookResults";
import Loading from "./Loading";
const MainPage = React.lazy(() => import("./MainPage.jsx"));
import {
  fetchBookByAuthor,
  fetchBookByTitle,
  fetchBookByAuthorWithTitle,
  fetchQuotes,
  getGenre,
  fetchRandomBook
} from "@/api/AccessToApi.jsx";
import useFetch from "@/hooks/useFetch.jsx";
// TODO: DISPLAY THE DATA ON THE CAROUSELS
// TODO: CREATE A STATE FOR A GENRE AND THEN CREATE A GET ROUTE ON THE PROXY BACKEND
import { BookSearchContext } from "../context/BookSearchContext.jsx";


const BookSearchContainer = ({ children }) => {
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
            dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByAuthor(state.searchText)});
          } else if (state.searchType[0] === "title") {
            console.log("Fetching titles with titlename");
            dispatch({ type : "SET_BOOK_DATA" , payload : await fetchBookByTitle(state.searchText)});
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

  const { data : quoteData } = useFetch(fetchQuotes);
  const { data : randomBookData} = useFetch(fetchRandomBook);
  const fetchGenre = useCallback(() => getGenre(state.genreTag) , [state.genreTag]);
  const {data : genreData} = useFetch(fetchGenre);
  
  useEffect(() => {
    if (quoteData) dispatch({ type : "SET_QUOTE_DATA" , payload : quoteData });
    if (randomBookData) dispatch({ type : "SET_CAROUSELA_DATA" , payload : randomBookData });
    if (genreData) dispatch({ type : "SET_GENRE_DATA" , payload : genreData });
    
  }, [quoteData , randomBookData, genreData]);

  // debouncing
  // fetchBookByAuthor(apiKey, searchText);
  // bookApi.fetchBookByTitle(searchText, setBookData);
  // fetchBookByAuthor(searchText); // moved to backend for security
  // TODO: WILL ADD A LANDING/START PAGE?

  return (
    <>
    <BookSearchContext.Provider value={{state , dispatch}} > {/* provide context on the children */}
        <div className="main-container flex flex-col justify-center items-center w-full h-full gap-4 ">
          <div className="inner-main w-full max-w-[1280px] min-h-[780px] rounded-[10px] mx-auto p-4">
            
            {children} {/* gets the children and put it here */}

            {/* <Suspense fallback={<Loading />}>
              {state.quoteData && !state.bookData && (
                <MainPage data={state.bookData} quoteData={state.quoteData} state={state} dispatch={dispatch}/>
              )}
            </Suspense> */}

            {!state.quoteData && !state.bookData && (
              <Loading/>
            )}

          </div>
        </div>
      </BookSearchContext.Provider>
    </>
    
  );
};

export default BookSearchContainer;
