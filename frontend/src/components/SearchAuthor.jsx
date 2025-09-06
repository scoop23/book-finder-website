import React, { useEffect } from 'react'
import { CodexCross } from './icons/CodexCross'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
// TODO : WHEN SEARCH BY AUTHOR AND SEARCH BY TITLE IS CLICKED 
// ADD HIDE THE SEARCH BY AUTHOR BUTTON AND SHOW A INPUT AUTHOR NAME



// USED THE STATES OF THE PARENT TO CHANGE THE BUTTONS
const SearchAuthor = ({ dispatch , state, setClickedSearchAuthor}) => {
  const navigate = useNavigate();
  const [localAuthorText, setLocalAuthorText] = useState(() => {
    return localStorage.getItem("authorText") || state.author;
  })

  useEffect(() => {
    localStorage.setItem("authorText" , localAuthorText);

  }, [localAuthorText])

  function onSubmitSearch(e) {
  if(e.key === 'Enter'){
      dispatch({ type : "SET_AUTHOR_TEXT" , payload : e.target.value })
      if(!state.searchText){
        console.error("Please Input some Title.")
        return;
      }

      if(e.target.value.trim()){
        setLocalAuthorText(e.target.value)

        navigate(`/search/title-author?p1=${encodeURIComponent(state.searchText)}&p2=${state.author}&page=1`);
      }
      console.error("Please Type a Author.")
      return;
      
    }
  }

  function resetAuthor() {
    // setSearchType(types => types.map(type => type === 'author' ? null : type))
    dispatch({ type : "SET_SEARCH_TYPE" , payload : { index : 1 , value : null }})
    setClickedSearchAuthor(false)
  }

  return (
    <div className='search-author-input h-[70px] bg-amber-50 rounded-4xl items-center justify-center flex p-4 font-inter'>
      <input 
      required
      className='author-search items-center outline-0 rounded-2xl'
      placeholder='Author Name..'
      type="text" 
      defaultValue={localAuthorText}
      onKeyDown={(e) => onSubmitSearch(e)}
      />
      <div className='rounded-2xl x-icon w-[40px] cursor-pointer' onClick={resetAuthor}>
        <CodexCross />
      </div>
    </div>
  )
}

export default SearchAuthor