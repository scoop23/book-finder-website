import React, { useEffect, forwardRef, useImperativeHandle, useState, useContext, useRef} from 'react'
import { CodexCross } from './icons/CodexCross'
import { useNavigate } from 'react-router-dom'
import { BookSearchContext } from '../context/BookSearchContext'
// TODO : WHEN SEARCH BY AUTHOR AND SEARCH BY TITLE IS CLICKED 
// ADD HIDE THE SEARCH BY AUTHOR BUTTON AND SHOW A INPUT AUTHOR NAME



// USED THE STATES OF THE PARENT TO CHANGE THE BUTTONS
const SearchAuthor = forwardRef(({ dispatch , setClickedSearchAuthor} , ref) => {
  const { state } = useContext(BookSearchContext)
  const navigate = useNavigate();
  const [localAuthorText, setLocalAuthorText] = useState(() => {
    return localStorage.getItem("authorText") || state.author;
  })
  const searchAuthorButtonRef = useRef(null);
  const searchAuthorInputRef = useRef(null);
  const XIconRef = useRef(null);

  useImperativeHandle(ref , () => ({
    searchAuthorButtonRef : searchAuthorButtonRef.current,
    searchAuthorInputRef : searchAuthorInputRef.current,
    XIconRef : XIconRef.current
  }))

  useEffect(() => {
    localStorage.setItem("authorText" , localAuthorText);
    dispatch({ type : "SET_AUTHOR_TEXT" , payload : localAuthorText })
  }, [localAuthorText, dispatch])

  function onSubmitSearch(e) {
    if(e.key === 'Enter'){
      setLocalAuthorText(e.target.value)
      console.log("set the author text")
      
      if(!state.searchText){
        console.error("Please Input some Title.")
      }
      
      console.log("author text exist")
      navigate(`/search/title-author?p1=${encodeURIComponent(state.searchText)}&p2=${e.target.value}&page=1`);
      
    }
  }

  function resetAuthor() {
    // setSearchType(types => types.map(type => type === 'author' ? null : type))
    dispatch({ type : "SET_SEARCH_TYPE" , payload : { index : 1 , value : null }})
    setClickedSearchAuthor(false)
  }

  return (
    <div className='search-author-input h-[70px] bg-amber-50 rounded-4xl items-center justify-center flex p-4 font-inter w-[174.41px] opacity-0'
    ref={searchAuthorButtonRef}>
      <input 
      ref={searchAuthorInputRef}
      required
      className='author-search items-center outline-0 rounded-2xl opacity-0'
      placeholder='Author Name..'
      type="text" 
      defaultValue={localAuthorText}
      onKeyDown={(e) => onSubmitSearch(e)}
      />
      <div className='rounded-2xl x-icon w-[40px] cursor-pointer' onClick={resetAuthor} ref={XIconRef}>
        <CodexCross />
      </div>
    </div>
  )
})

export default SearchAuthor