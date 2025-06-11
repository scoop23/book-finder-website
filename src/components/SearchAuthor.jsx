import React from 'react'

// TODO : WHEN SEARCH BY AUTHOR AND SEARCH BY TITLE IS CLICKED 
// ADD HIDE THE SEARCH BY AUTHOR BUTTON AND SHOW A INPUT AUTHOR NAME

const SearchAuthor = () => {
  return (
    <div className=''>
      <input type="text" defaultValue={""} className='author-search'/>
    </div>
  )
}

export default SearchAuthor