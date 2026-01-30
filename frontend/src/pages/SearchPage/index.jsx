import React, { useContext } from 'react'
import BookSearchContainer from '../../components/BookSearchContainer';
import SearchBar from '../../components/SearchBar';
import { Outlet } from 'react-router-dom';
import { BookSearchContext } from '../../context/BookSearchContext';
import SearchPagePaginationResults from '../../components/SearchPagePaginationResults';
const SearchPage = () => {
  return (
    <BookSearchContainer>
      <SearchBar />
      <Outlet />
    </BookSearchContainer>
  )
}

export default SearchPage;
