import React, { useEffect } from 'react'
import { FaSearch , FaHome } from 'react-icons/fa';
import { animate } from 'motion';


const SearchBar = ({ value , onValueChange }) => {  
  function handleClickSearch() {
    const input = document.querySelector('.input-search');
  
    if(input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.classList.add('inline-block');
      animate(input, { width: ['0px','200px'], duration: 0.5 });
    } else {
      animate(input, { width: ['200px', '0px'] , duration: 0.5 }).finished.then(() => { // can also be used as a promise
        input.classList.remove('inline-block');
        input.classList.add('hidden');
      })
    }
  }
  
  function searchByAuthorClick() {

  }

  return (
    <div className='outer-search-bar-container p-[20px] max-w-full min-h-[20px] flex justify-between gap-2 '>
      <button className='home-button flex flex-row gap-2 items-center rounded-4xl p-8 border-1 h-[70px] text-amber-100 hover:text-black hover:bg-amber-50 duration-250 transition-all cursor-pointer'><FaHome /></button>
      <div className='flex gap-2'>
        <button className='hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-winky cursor-pointer hover:shadow-lg hover:text-black text-amber-100'>Search By Title</button>
        <button className=' hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-winky cursor-pointer hover:shadow-lg hover:text-black text-amber-100'
        onClick={() => searchByAuthorClick()}>Search by Author</button>
          <div className='inner-search flex flex-row gap-2 items-center rounded-4xl p-8 bg-amber-50 h-[70px]'>
            <input
            className={`input-search hidden w-0 rounded-2xl outline-0 font-inter`}
            type="text" 
            value={value}
            onChange={(e) => {
              onValueChange(e.target.value);
            }}
            placeholder='Search for books..'
            />
            <div className='click-search' onClick={() => handleClickSearch()}>
              <FaSearch />
            </div>
          </div>
        </div>
    </div>
  )
}

export default SearchBar;