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
  const [bookData , setBookData] = useState(null);
  const [bookApi] = useState(new BookApi());
  // const [isLoading , setIsloading] = useState(true);

  const fetchBookByAuthor = async (searchText) => {
    const response = await axios.get(`http://localhost:8080/api/search?q=${searchText}`);
    const data = response.data;
    setBookData(data);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchText.trim() != '') {
        
        // fetchBookByAuthor(apiKey, searchText);
        // bookApi.fetchBookByTitle(searchText, setBookData);
        fetchBookByAuthor(searchText); // moved to backend for security

      }
    }, 1000);
    
    return () => clearTimeout(delay); // cleanup
    
  }, [searchText]);
  
  // TODO: WILL ADD A LANDING/START PAGE?
  
  return (
    <>
      <div className='main-container flex flex-col justify-center items-center w-full h-screen gap-2'>
        <div className='inner-main min-w-[1600px] min-h-[800px] rounded-[10px] items-center'>
          <SearchBar 
          value={searchText}
          onValueChange={setSearchText}
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