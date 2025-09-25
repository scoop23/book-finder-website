import React, { useEffect } from 'react'
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';
import { useContext } from 'react';
import { BookSearchContext } from '../../../context/BookSearchContext';

const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');
  const { state, dispatch } = useContext(BookSearchContext);


  // const {isPending : isPending, data : data} = useFetchData(searchQuery , '/search/title')
  const {data , isPending} = useFetchDataTitleSearch(
    searchQuery + "Text",
    "/search/title", 
    searchQuery,
    pageParams,
  );
    
  useEffect(() => {
    if( data ) {
      dispatch({ type : "SET_BOOK_DATA" , payload : data});
    }
      // dispatch({ type : "SET_BOOK_DATA" , payload : data});

  }, [data , dispatch])

  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={isPending}/>
    </div>
  )
}

export default TitlePageResults;