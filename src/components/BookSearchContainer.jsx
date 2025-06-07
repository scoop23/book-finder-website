import React, { use, useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';
import BookApi from './BookApi';
import Loading from './Loading';
import MainPage from './MainPage';
import axios from 'axios';


const BookSearchContainer = () => {
  const [searchText , setSearchText] = useState('');
  const [searchType , setSearchType] = useState('');
  const [bookData , setBookData] = useState(null);
  console.log(bookData)
  // const [bookApi] = useState(new BookApi());
  // const [isLoading , setIsloading] = useState(true);

  const fetchBookByAuthor = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-author?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  const fetchBookByTitle = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-title?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchText.trim() != '') {
        if(searchType === '') { 
          fetchBookByAuthor(searchText) // for now default to author
        } else if(searchType === 'title') {
          fetchBookByTitle(searchText);
        } else if(searchType === 'author'){
          fetchBookByAuthor(searchText) // for now default to author
        } else {
          console.error("hey hey hey")
        }
        // debouncing 
        // fetchBookByAuthor(apiKey, searchText);
        // bookApi.fetchBookByTitle(searchText, setBookData);
        // fetchBookByAuthor(searchText); // moved to backend for security
      }
    }, 600);
    return () => clearTimeout(delay); // cleanup debounce
  }, [searchText, searchType]);
  
  // TODO: WILL ADD A LANDING/START PAGE?
  
  return (
    <>
      <div className='main-container flex flex-col justify-center items-center w-full h-full gap-4'>
        <div className="inner-main w-full max-w-[1280px] min-h-[800px] rounded-[10px] mx-auto p-4">
          <SearchBar 
          value={searchText}
          onValueChange={setSearchText}
          setSearchType={setSearchType}
          />
          {bookData ? (<div className='inner-book-result-container p-2 min-w-full flex items-center justify-center'> 
            <BookResults data={bookData} />
          </div>) : (
            <>
              <MainPage />
            </>
          )}
        </div>
      </div>
    </>
    
  )
}

export default BookSearchContainer;