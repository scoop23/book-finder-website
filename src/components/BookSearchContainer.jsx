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
  const [searchType , setSearchType] = useState(new Array(2).fill(null));
  const [bookData , setBookData] = useState(null);
  console.log(searchType)
  console.log(searchText.trim())
  
  // const [bookApi] = useState(new BookApi());
  // const [isLoading , setIsloading] = useState(true);

  const fetchBookByAuthor = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-author?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  const fetchBookByAuthorWithTitle = async (searchType, searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-author-title?p1=${searchText}&p2=${searchType[1]}`);
    const data = response.data
    setBookData(data)
  }

  const fetchBookByTitle = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-title?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchType.includes(null)) {
        if(searchText.trim() !== '') {
          if(searchType[1] === 'author') {
            console.log("hey1")
            fetchBookByAuthor(searchText);
          } else if (searchType[0] === 'title') {
            console.log("hey")
            fetchBookByTitle(searchText);
          }
        }
      } else if(
        searchType.length === 2 &&
        searchType[0] &&
        searchText.trim() !== ''
      ) {
        console.log("heyheyhey")
        fetchBookByAuthorWithTitle(searchType, searchText);
      }
    }, 500);
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
          searchType={searchType}
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