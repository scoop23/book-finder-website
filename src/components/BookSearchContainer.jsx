import React, { use, useEffect, useReducer, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';
import Loading from './Loading';
import MainPage from './MainPage';
import axios from 'axios';
import {
  fetchBookByAuthor,
  fetchBookByTitle,
  fetchBookByAuthorWithTitle,
  fetchQuotes
} from './api/AccessToApi';

// TODO: DISPLAY THE DATA ON THE CAROUSELS

const BookSearchContainer = () => {

  const [searchText , setSearchText] = useState('');
  const [author , setAuthor] = useState('');
  const [searchType , setSearchType] = useState([null, null]);
  const [bookData , setBookData] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading , setIsloading] = useState(false);
  const [mainPageData , setMainPageData] = useState(null);
  // const [bookApi] = useState(new BookApi());

  useEffect(() => {
    const delay = setTimeout(async () => {
      if(searchType.includes(null)) {
        if(searchText.trim() !== '') {
          if(searchType[1] === 'author') {
            console.log("Fetching Titles with authorname")
            setBookData(await fetchBookByAuthor(searchText));
          } else if (searchType[0] === 'title') {
            console.log("Fetching titles with titlename")
            setBookData(await fetchBookByTitle(searchText));
          }
        }
      } else if(
        searchType.length === 2 &&
        searchType[0] && searchType[1] &&
        searchText.trim() !== ''
      ) {
        console.log("Fetching titles with matching authorname")
        setBookData(await fetchBookByAuthorWithTitle(author, searchText));
      }
    }, 1000);
    return () => clearTimeout(delay); // cleanup debounce
  }, [searchText, searchType, author]);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetchQuotes();
        if(response && response.length > 0) {
          setQuoteData(response)
        }
      } catch (e) { 
        console.error("Error Fetching Quotes" , e);
      }
    };

    getQuote();
  }, [])

  // debouncing 
  // fetchBookByAuthor(apiKey, searchText);
  // bookApi.fetchBookByTitle(searchText, setBookData);
  // fetchBookByAuthor(searchText); // moved to backend for security
  // TODO: WILL ADD A LANDING/START PAGE?

  return (
    <>
      <div className='main-container flex flex-col justify-center items-center w-full h-full gap-4'>
        <div className="inner-main w-full max-w-[1280px] min-h-[800px] rounded-[10px] mx-auto p-4">
          <SearchBar 
            value={searchText}
            onValueChange={setSearchText}
            setSearchType={setSearchType}
            searchType={searchType}
            setAuthor={setAuthor}
          />
          {bookData ? (
            <div className='inner-book-result-container p-2 min-w-full flex items-center max-w-[1280px] justify-center'> 
              <BookResults data={bookData} />
            </div>
          ) : quoteData ? (
            <MainPage data={bookData} quoteData={quoteData} />
          ) : (
            <>
              <Loading />
            </>
          )}

        </div>
      </div>
    </>
    
  )
}

export default BookSearchContainer;

