import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
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
  

  return (
    <div className='outer-search-bar-container p-[20px] max-w-full min-h-[20px] flex justify-end-safe'>
        <div 
        className='inner-search flex flex-row gap-2 items-center rounded-4xl p-8 bg-amber-50 h-[70px]'
        >
          <input
          className={`input-search hidden w-0 rounded-2xl outline-0 font-inter`}
          type="text" 
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder='Search for books..'
          />
          <div className='click-search' onClick={() => handleClickSearch()}>
            <FaSearch />
          </div>
        </div>
    </div>
  )
}

export default SearchBar;