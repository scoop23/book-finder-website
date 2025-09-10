import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination } from './ui/pagination';

const SearchPagePaginationResults = ({ totalPages }) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if(searchParams.has('p1') && searchParams.has('p2')) {
    const title = searchParams.get('p1');
    const author = searchParams.get('p2');

    navigate(`/search/title-author?p1=${title}&p2=${author}&page=${}`)
  }

  const searchQuery = searchParams.get('query')
  const page = Number(searchParams.get('page'));

  function handlePage() {
    let type = undefined;
    // state.searchType = [null , null]
    if(state.searchType.includes(null)) {
      if(state.searchType[0] === 'title'){
        type = title;
      } else if (state.searchType[1] === 'author') {
        type = author;
      }
      navigate(
      `/search/${type}?q=${searchQuery}&page=${page}`
      )
    } else {
      console.log("page for author and title")
    }

    
  }


  return (
    <div>
      <Pagination>

      </Pagination>
    </div>
  )
}

export default SearchPagePaginationResults