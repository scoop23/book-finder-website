import React, { useEffect, useRef, useState } from 'react'
import { FaSearch , FaHome } from 'react-icons/fa';
import { animate } from 'motion';
import { useElementScroll } from 'motion/react';
import  SearchAuthor  from './SearchAuthor.jsx'

const SearchBar = ({ dispatch , state }) => {  
  const [clickedSearchTitle, setClickedSearchTitle] = useState(false);
  const [clickedSearchAuthor, setClickedSearchAuthor] = useState(false);
  const searchAuthor = useRef()
  const searchTitle = useRef();


  const { 
    searchType 
  } = state; // get the state 

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

  useEffect(() => {
  if (searchType.includes("author")) {
    setClickedSearchAuthor(true);
  } else {
    setClickedSearchAuthor(false);
  }

  if (searchType.includes("title")) {
    setClickedSearchTitle(true);
  } else {
    setClickedSearchTitle(false);
  }
}, [searchType]);


function buttonSearchTitle() {
  const element = searchTitle.current;

  if (!element) {
    console.error("Element does not exist.");
    return;
  }

  if (!clickedSearchTitle) {

    // setSearchType((type) => {
    //   const array = [...type]
    //   array[0] = 'title'
    //   return array
    // });

    dispatch({ type : 'SET_SEARCH_TYPE', payload : {index : 0, value : 'title'}});
    setClickedSearchTitle(true);
    
    element.classList.remove("hover:bg-amber-50", "hover:text-black");
    element.classList.add("bg-amber-50", "text-black", "hover:bg-primary-ebony-clay", "hover:text-amber-100");

  } else {
    // setSearchType(prev => prev.map(type => type === 'title' ? null : type));
    dispatch({ type: 'SET_SEARCH_TYPE', payload: { index: 0, value: null } });

    setClickedSearchTitle(false)

    element.classList.remove("bg-amber-50","text-black", "hover:bg-primary-ebony-clay", "hover:bg-amber-50");
    element.classList.add("hover:bg-amber-50" , "hover:text-black");
  }
}

// ADD ANIMATION WHEN CLICKED/ENTER
async function searchBarAnimation() {
  
}

function buttonSearchAuthor() {
  const element = searchAuthor.current
  
  if(!element) {
    console.log("No ", element)
  }

  if(!clickedSearchAuthor) {

    // setSearchType((type) => {
    //   const array = [...type]
    //   array[1] = 'author'
    //   return array
    // });

    dispatch({ type : 'SET_SEARCH_TYPE', payload : { index : 1 , value : "author"} })
    setClickedSearchAuthor(true);

    // element.classList.remove("hover:bg-amber-50" , "hover:text-black")
    // element.classList.add("hover:bg-primary-ebony-clay" , "text-black", "bg-amber-50", "hover:text-amber-100")
  } else {

    // setSearchType(prev => prev.map(type => type === 'author' ? null : type));
    dispatch({ type : 'SET_SEARCH_TYPE', payload : { index : 1, value : null} })
    setClickedSearchAuthor(false); 

    // element.classList.remove("hover:bg-primary-ebony-clay" , "text-black", "bg-amber-50", "hover:text-amber-100")
    // element.classList.add("hover:bg-amber-50" , "hover:text-black")
  }
}

  return (
    <div className='search-bar-wrapper flex flex-col'>
      
      <div className='outer-search-bar-container p-[20px] max-w-full min-h-[20px] flex justify-between gap-2 '>
        <button className='home-button flex flex-row gap-2 items-center rounded-4xl p-8 border-1 h-[70px] text-amber-100 hover:text-black hover:bg-amber-50 duration-250 transition-all cursor-pointer'><FaHome /></button>

        <div className='flex gap-2 buttons-wrapper'>

          <button className='search-title hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-satoshi cursor-pointer hover:shadow-lg hover:text-black text-amber-100'
          onClick={() => buttonSearchTitle()} ref={searchTitle}>Title Search</button>

          {!(searchType.includes("title") && searchType.includes("author")) &&
            // opposite of when author and title search are active
            <> 
              <button className={`${ clickedSearchAuthor ? 'hover:bg-primary-ebony-clay text-black bg-amber-50 hover:text-amber-100' : 'hover:bg-amber-50 hover:text-black text-amber-100'} search-author hover:bg-amber-50 duration-250 transition-all flex justify-center items-center border-1 rounded-4xl p-8 h-[70px] font-satoshi cursor-pointer hover:shadow-lg `}
              onClick={() => buttonSearchAuthor()} ref={searchAuthor}>Author Search</button> 
            </>
          }
          
          {searchType.includes("author") && searchType.includes("title")
            && // if it includes 2 searchtypes in the searchType array it will initiate search by title and author
            (<SearchAuthor dispatch={dispatch} state={state} setClickedSearchAuthor={setClickedSearchAuthor}/>) // pass in the states for it to works
          }

            <div className='inner-search flex flex-row gap-2 items-center rounded-4xl p-4 bg-amber-50 h-[70px] justify-center'>
              <input
              className={`input-search hidden w-0 rounded-2xl outline-0 font-winky`}
              type="text"
              defaultValue={""}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  dispatch({ type : "SET_SEARCH_TEXT" , payload : e.target.value })
                }
              }}
              placeholder={`${searchType.includes("author") && searchType.includes("title") ? "Search Title of Book.. " : "Author/Title a Book.. "}`}
              />
              <div className='click-search w-[40] h-[40] p-2 cursor-pointer' onClick={() => handleClickSearch()}>
                <FaSearch />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SearchBar;