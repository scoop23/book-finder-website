import React, { useContext } from 'react'
import BookResults from '../../../components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useEffect } from 'react';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';

const AuthorPageResults = () => {
  const { state , dispatch } = useContext(BookSearchContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');
  
  console.log(searchQuery)
  console.log(pageParams)

  // const {isPending : isPending, data : data} = useFetchData(searchQuery , '/search/title')
  const {data , isPending} = useFetchDataTitleSearch(
    searchQuery + "Text",
    "/search/author", 
    searchQuery,
    pageParams,
  );

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_BOOK_DATA", payload: data });
    }
  }, [data, dispatch]);

  

  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={isPending}/>
    </div>
  )
}

export default AuthorPageResults;