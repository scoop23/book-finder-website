import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageLink, Pagination, PaginationContent } from './ui/pagination';
import { useEffect, useContext, useState } from 'react';
import { BookSearchContext } from '../context/BookSearchContext';

const SearchPagePaginationResults = ({ totalPages }) => {  
  const { state } = useContext(BookSearchContext);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageParam , setPageParam] = useState(0);
  const [searchedQuery, setQuerySearched] = useState('');

  const searchQuery = searchParams.get('query'); // gets the ?query="get this"
  const page = Number(searchParams.get('page')); // gets the page ?page=

  useEffect(() => {
    setPageParam(page); // if page change then this will execute
  }, [page])

  const pages = [];
  const range = 2;
  for (let i = Math.max(1 , pageParam - range); i <= Math.min(totalPages ?? 0 , 
    pageParam + range); i++) { // 
    pages.push(i);
  }

  function handlePage(num) {
    let type = undefined;
    if(state.searchType[0] === null && state.searchType[1] === null) {
      console.error("User needs to toggle a search type.")
      return;
    }
    
    // if(searchParams.has('p1') && searchParams.has('p2')) {
    //   const title = searchParams.get('p1');
    //   const author = searchParams.get('p2');

    //   navigate(`/search/title-author?p1=${title}&p2=${author}&page=${num}`)
    // }
    
    // state.searchType = [null , null]
    if(state.searchType.includes(null)) {
      if(state.searchType[0] === 'title'){
        type = "title";
      } else if (state.searchType[1] === 'author') {
        type = "author";
      }
      navigate(
      `/search/${type}?query=${searchQuery}&page=${num}`
      )
    } else {
      console.log("page for author and title")
      const title = searchParams.get('p1');
      const author = searchParams.get('p2');
      navigate(`/search/title-author?p1=${title}&p2=${author}&page=${num}`)

    }
  }


  return (
    <div className=''>
      <Pagination>
        <PaginationContent>
          {/* Button here */}
          {pages.map((num) => (
            <PageLink
              key={num}
              onClick={() => handlePage(num)}
              className={`page-btn border max-w-[110px] ${num === page ? 'bg-gray-500 text-black' : ''} px-[15px] py-[10px] rounded-[65px] cursor-pointer hover:bg-gray-500 transition-all duration-250 text-center text-white bg-[#212129] `}
            >
              {num}
            </PageLink>
          ))}
          {/* Button here */}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default SearchPagePaginationResults