// .. MAIN 
import { Suspense, useCallback, useContext, useEffect } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import "../App.css";
import BookResults from "./BookResults";
import Loading from "./Loading";

import {
  fetchQuotes,
  getGenre,
  fetchRandomBook
} from "@/api/AccessToApi.jsx";
import useFetch from "@/hooks/useFetch.jsx";
// TODO: CREATE A STATE FOR A GENRE AND THEN CREATE A GET ROUTE ON THE PROXY BACKEND
import { BookSearchContext } from "../context/BookSearchContext.jsx";


const  BookSearchContainer = ({ children }) => {
  const { state , dispatch } = useContext(BookSearchContext);
  const { data : quoteData } = useFetch(fetchQuotes);
  const { data : randomBookData} = useFetch(fetchRandomBook);
  const fetchGenre = useCallback(() => getGenre(state.genreTag) , [state.genreTag]);
  const {data : genreData} = useFetch(fetchGenre);
  
  useEffect(() => {
    if (quoteData) dispatch({ type : "SET_QUOTE_DATA" , payload : quoteData });
    if (randomBookData) dispatch({ type : "SET_CAROUSELA_DATA" , payload : randomBookData });
    if (genreData) dispatch({ type : "SET_GENRE_DATA" , payload : genreData });
  }, [quoteData, randomBookData, genreData ,dispatch]);

  // debouncing
  // fetchBookByAuthor(apiKey, searchText);
  // bookApi.fetchBookByTitle(searchText, setBookData);
  // fetchBookByAuthor(searchText); // moved to backend for security
  // TODO: WILL ADD A LANDING/START PAGE?

  return (
    <>
     {/* provide context on the children */}
        <div className="main-container flex flex-col justify-center items-center w-full h-full gap-4 ">
          <div className="inner-main w-full max-w-[1280px] min-h-[800px] rounded-[10px] mx-auto p-4">
            
            {children} {/* gets the children and put it here */}

            {/* <Suspense fallback={<Loading />}>
              {state.quoteData && !state.bookData && (
                <MainPage data={state.bookData} quoteData={state.quoteData} state={state} dispatch={dispatch}/>
              )}
            </Suspense> */}

            {/* {!state.quoteData && !state.bookData && (
              <Loading/>
            )} */}

          </div>
        </div>
    </>
    
  );
};

export default BookSearchContainer;
