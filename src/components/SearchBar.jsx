import React, { useEffect, useRef, useState } from 'react'
import { FaSearch , FaHome } from 'react-icons/fa';
import { animate } from 'motion';
import { useElementScroll } from 'motion/react';

const SearchBar = ({ value , onValueChange, setSearchType }) => {  
  const [clickedSearchTitle, setClickedSearchTitle] = useState(false);
  const [clickedSearchAuthor, setClickedSearchAuthor] = useState(false);

  const searchTitle = useRef();
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

function buttonSearchTitle() {
  const element = searchTitle.current;

  if (!element) {
    console.error("Element does not exist.");
    return;
  }


  if (!clickedSearchTitle) {
    setSearchType("title");
    setClickedSearchTitle(true)
    element.classList.remove("hover:bg-amber-50", "hover:text-black");
    element.classList.add("bg-amber-50", "text-black", "hover:bg-primary-ebony-clay", "hover:text-amber-100");
  } else {
    setSearchType("");
    setClickedSearchTitle(false)
    element.classList.remove("bg-amber-50","text-black", "hover:bg-primary-ebony-clay", "hover:bg-amber-50");
    element.classList.add("hover:bg-amber-50" , "text-amber-100");
  }
}

  return (
    <div className='search-bar-wrapper flex flex-col'>
      
      <div className='outer-search-bar-container p-[20px] max-w-full min-h-[20px] flex justify-between gap-2 '>
        <button className='home-button flex flex-row gap-2 items-center rounded-4xl p-8 border-1 h-[70px] text-amber-100 hover:text-black hover:bg-amber-50 duration-250 transition-all cursor-pointer'><FaHome /></button>
        <div className='flex gap-2'>

          <button className='search-title hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-winky cursor-pointer hover:shadow-lg hover:text-black text-amber-100'
          onClick={() => buttonSearchTitle()} ref={searchTitle}>Search By Title</button>

          <button className='search-author hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-winky cursor-pointer hover:shadow-lg hover:text-black text-amber-100'
          onClick={() => setSearchType("author")}>Search by Author</button>

            <div className='inner-search flex flex-row gap-2 items-center rounded-4xl p-4 bg-amber-50 h-[70px]'>
              <input
              className={`input-search hidden w-0 rounded-2xl outline-0 font-inter p-4`}
              type="text"
              defaultValue={""}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  onValueChange(e.target.value);
                }
              }}
              placeholder='Search for books..'
              />
              <div className='click-search w-[40] h-[40] p-3 cursor-pointer' onClick={() => handleClickSearch()}>
                <FaSearch />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SearchBar;