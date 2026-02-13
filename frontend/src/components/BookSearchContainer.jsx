// .. MAIN 
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import "../App.css";

import {
  fetchQuotes,
  getGenre,
  fetchRandomBook
} from "@/api/AccessToApi.jsx";
import useFetch from "@/hooks/useFetch.jsx";
// TODO: CREATE A STATE FOR A GENRE AND THEN CREATE A GET ROUTE ON THE PROXY BACKEND
// TODO: WILL ADD A LANDING/START PAGE?
import { BookSearchContext } from "../context/BookSearchContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchBookByTitleOL } from "../api/AccessToApi.jsx";

const BookSearchContainer = ({ children }) => {
  const { state, dispatch } = useContext(BookSearchContext);
  // const { data: quoteData } = useFetch(fetchQuotes);
  const quoteData = useQuery({
    queryKey: ["randomQuote"],
    queryFn: fetchQuotes,
    enable: false,
    retry: 1, // retry once?
    refetchOnWindowFocus: false,
  });

  const { data: randomBookData } = useFetch(fetchRandomBook);
  const fetchGenre = useCallback(() => getGenre(state.genreTag), [state.genreTag]);
  const { data: genreData } = useFetch(fetchGenre);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { // this runs once. after mount.
    const checkMobile = () => { setIsMobile(window.innerWidth < 1185) }; // if window is less than 1185 px then the website is in mobile view.
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    if (quoteData.data) dispatch({ type: "SET_QUOTE_DATA", payload: quoteData.data });
    if (randomBookData) dispatch({ type: "SET_CAROUSELA_DATA", payload: randomBookData });
    if (genreData) dispatch({ type: "SET_GENRE_DATA", payload: genreData });
  }, [quoteData.data, randomBookData, genreData, dispatch]);

  // debouncing
  // fetchBookByAuthor(apiKey, searchText);
  // bookApi.fetchBookByTitle(searchText, setBookData);
  // fetchBookByAuthor(searchText); // moved to backend for security

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
