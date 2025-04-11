import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';


const apiKey = import.meta.env.VITE_BOOK_API_KEY;

const BookSearchContainer = () => {
  const [searchText , setSearchText] = useState('');
  const [bookData , setBookData] = useState({})

  async function fetchBookByAuthor(apiKey, searchText) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchText}&key=${apiKey}`);
    const data = await response.json();
    setBookData(data);
  }

  async function fetchBookByTitle(apiKey, searchText) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&key=${apiKey}`);
    const data = await response.json();
    setBookData(data);
  }

  console.log(bookData?.items); 
  
  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchText.trim() != '') {
        fetchBookByAuthor(apiKey , searchText);
        fetchBookByTitle(apiKey, searchText);
      }
    }, 600);
    
    return () => clearTimeout(delay); // cleanup
    
  }, [searchText]);

  
  return (
    <div className='main-container flex flex-col justify-center items-center w-full h-screen p-6 gap-2'>
      <div className='inner-main max-w-[1500px] min-h-[800px] rounded-[10px]'>
        <SearchBar 
        value={searchText}
        onValueChange={setSearchText}
        />
        <div className='inner-book-result-container p-2'>
            <BookResults />  
        </div>
      </div>
    </div>
  )
}

export default BookSearchContainer;