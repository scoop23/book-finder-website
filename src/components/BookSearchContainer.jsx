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
  const [searchType , setSearchType] = useState([]);
  const [bookData , setBookData] = useState(null);
  console.log(searchType)
  // const [bookApi] = useState(new BookApi());
  // const [isLoading , setIsloading] = useState(true);

  const fetchBookByAuthor = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search-author?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  const fetchBookByAuthorAndTitle = async (searchType) => {
    const response = await axios.get(`http://localhost:8080/api/search-author-title?p1=${searchType[0]}&p2=${searchType[1]}`);
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
      if(searchType.length === 0) {
        if(searchText.trim === '') {
          if(searchType === 'author') {
            fetchBookByAuthor(searchText);
          } else if (searchType === 'title') {
            fetchBookByTitle(searchText);
          }
        }
      } else {
        fetchBookByAuthorAndTitle(searchType);
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