import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';
import BookApi from './BookApi';

const BookSearchContainer = () => {
  const [searchText , setSearchText] = useState('');
  const [bookData , setBookData] = useState({});
  const [bookApi] = useState(new BookApi(import.meta.env.VITE_BOOK_API_KEY));

  
  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchText.trim() != '') {
        // fetchBookByAuthor(apiKey, searchText);
        bookApi.fetchBookByTitle(searchText, setBookData);
      }
    }, 600);
    
    return () => clearTimeout(delay); // cleanup
    
  }, [searchText]);

  
  return (
    <div className='main-container flex flex-col justify-center items-center w-full h-screen gap-2'>
      <div className='inner-main min-w-[1600px] min-h-[800px] rounded-[10px] items-center'>
        <SearchBar 
        value={searchText}
        onValueChange={setSearchText}
        />
        <div className='inner-book-result-container p-2 min-w-full flex items-center justify-center'> 
            <BookResults data={bookData} />  
        </div>
      </div>
    </div>
  )
}

export default BookSearchContainer;