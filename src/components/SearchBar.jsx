import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
import { animate } from 'motion';


const SearchBar = ({ value , onValueChange }) => {
  console.log(value)

  
  function handleClickSearch() {
    const input = document.querySelector('.input-search');
  
    if(input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.classList.add('inline-block');
      animate(input, { width: ['0px','200px'], duration: 0.5 });
    } else {
      animate(input, { width: ['200px', '0px'] , duration: 0.5 }).finished.then(() => {
        input.classList.remove('inline-block');
        input.classList.add('hidden');
      })
    }
  }
  

  return (
    <div className='outer-search-bar-container p-[20px] min-w-full min-h-[20px] flex justify-end-safe'>
        <div 
        className='inner-search flex flex-row gap-2 items-center rounded-4xl p-7 bg-amber-50 h-[70px]'
        >
          <input
          className={`input-search hidden w-0`}
          type="text" 
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          />
          <div className='click-search' onClick={() => handleClickSearch()}>
            <FaSearch />
          </div>
        </div>
    </div>
  )
}

export default SearchBar;