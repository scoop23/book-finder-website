import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import '../App.css'
import BookResults from './BookResults';

async function fetchBookByAuthor(apiKey, searchText, setBookData) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchText}&key=${apiKey}`);
  const data = await response.json();
  setBookData(data);
}

async function fetchBookByTitle(apiKey, searchText, setBookData) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&key=${apiKey}`)

  try{
    const data = await response.json();
    setBookData(data);
  } catch(err) {
    console.log("An Error Occured: ", err);
  }
}

const apiKey = import.meta.env.VITE_BOOK_API_KEY;

const BookSearchContainer = () => {
  const [searchText , setSearchText] = useState('');
  const [bookData , setBookData] = useState({})

  
  
  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchText.trim() != '') {
        // fetchBookByAuthor(apiKey, searchText);
        fetchBookByTitle(apiKey, searchText, setBookData);
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
        <div className='inner-book-result-container p-2 min-w-[1204px] flex'> 
            <BookResults data={bookData} />  
        </div>
      </div>
    </div>
  )
}

export default BookSearchContainer;