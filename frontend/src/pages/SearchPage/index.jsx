import React from 'react'
import BookSearchContainer from '../../components/BookSearchContainer';
import SearchBar from '../../components/SearchBar';
import { Outlet } from 'react-router-dom';

const SearchPage = () => {
  return (
    <BookSearchContainer>
      <SearchBar/>
      <Outlet />
    </BookSearchContainer>
  )
}

export default SearchPage;