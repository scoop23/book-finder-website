import React, { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageLink, Pagination, PaginationContent } from './ui/pagination';
import { useContext } from 'react';
import { BookSearchContext } from '../context/BookSearchContext';
import gsap from 'gsap'
import SearchPageNone from './ui/SearchPageNone';

const SearchPagePaginationResults = ({ totalPages }) => {  
  const { state } = useContext(BookSearchContext);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query'); // gets the ?query="get this"
  const page = Number(searchParams.get('page')) || 1; // gets the page ?page=
  const paginationButtonArray = useRef([]);
  const pageContentRef = useRef(null);

  // useEffect(() => {
  //   setPageParam(page); // if page change then this will execute
  // }, [page])

  const pages = [];
  const range = 3;
  for (let i = Math.max(1 , page - range); i <= Math.min(totalPages ?? 0 , 
    page + range); i++) { // 
    pages.push(i);
  }

  function handlePage(num) {
    if(searchQuery === null || searchQuery === undefined || !searchQuery || searchQuery === 'null') {
      alert("Input something boy.")
      return;
    }

    let type = undefined;
    if(state.searchType[0] === null && state.searchType[1] === null) {
      console.error("User needs to toggle a search type.")
      alert("User needs to toggle a search type.")
      return;
    } else if (state.searchType.length > 0) {
      // console.log(state.searchType)
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

      if(title === null && author === null) {
        alert("Please Input title and author");
        return;
      }
      navigate(`/search/title-author?p1=${title}&p2=${author}&page=${num}`)

    }
  }

  useEffect(() => {

    if (!pageContentRef.current) return;
    
    gsap.fromTo(
      pageContentRef.current,
      { autoAlpha : 0, x : 30 },
      { autoAlpha : 1, x : 0 }
    );
    
    console.log(paginationButtonArray)

    const buttons = paginationButtonArray.current.filter(Boolean);

    if (buttons.length > 0) {
      const staggerFrom = (page === 1 || page === 2) ? "start" : "center";
      // uses the page number rather than the dom node because the dom node will always be truthy.
      gsap.fromTo(
        buttons,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: { each : 0.05 , from : staggerFrom}, ease: "power3.out" }
        // also take note. stagger property is very smart and knows the length of the array.
      );
    } 
  }, [page]); // run when page changes


  if(!state.bookData?.items) {
    return (
      <div className='flex justify-center items-center pr-5'>
        <SearchPageNone />
      </div>
    )
  }
  

  return (
    <div className='flex items-center'>
      <Pagination>
        <PaginationContent
        ref={pageContentRef}
        > {/* */}
          {/* Button here */}
          {pages.map((num , index) => (
            <PageLink
              key={num}
              onClick={() => handlePage(num)}
              ref={(el) => paginationButtonArray.current[index] = el}
              className={`page-btn max-w-[110px] ${num === page ? 'bg-gray-500 text-black' : ''} px-[15px] py-[10px] rounded-[65px] cursor-pointer hover:bg-gray-500 transition-all duration-250 text-center text-white bg-[#212129] shadow-custom4-first-content`}
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