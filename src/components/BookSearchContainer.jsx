import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';
import { FaBeer , FaSearch } from 'react-icons/fa';

const apiKey = import.meta.env.VITE_BOOK_API_KEY;

const BookSearchContainer = () => {
  const [searchAuthor , setSearchAuthor] = useState('');
  const [bookData , setBookData] = useState({})

  async function fetchBookByAuthor(apiKey , searchAuthor) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchAuthor}&key=${apiKey}`);
    const data = await response.json();
    setBookData(data);
  }

  console.log(bookData?.items); 
  
  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchAuthor.trim() != '') {
        fetchBookByAuthor(apiKey , searchAuthor);
      }
    }, 600);
    
    return () => clearTimeout(delay); // cleanup
    
  }, [searchAuthor]);

  
  return (
    <div className='main-container flex flex-col justify-center items-center w-full h-screen p-6 gap-2'>
      <div className='inner-main min-w-[1500px] min-h-[800px] rounded-[10px] shadow-[0px_9px_21px_8px_rgba(157,93,47,1)] '>
        <SearchBar 
        value={searchAuthor}
        onValueChange={setSearchAuthor}
        />
        <div className='inner-book-result-container p-2'>
            <BookResults />  
        </div>
      </div>
    </div>
  )
}

export default BookSearchContainer;