import React, { useContext } from 'react'
import BookResults from '../../../components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useEffect } from 'react';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';
import { useQuery } from '@tanstack/react-query';
import { fetchBookByAuthorOL } from '../../../api/AccessToApi';
// TODO: fetch data as author from openlib

const AuthorPageResults = () => {
  const { state, dispatch } = useContext(BookSearchContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');

  console.log(searchQuery)
  console.log(pageParams)

  const authorSearchData = useQuery({
    queryKey: ["authersearchdata", searchQuery, pageParams],
    queryFn: () => fetchBookByAuthorOL(searchQuery, pageParams),
    enabled: !!searchQuery,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (authorSearchData) {
      dispatch({ type: "SET_BOOK_DATA", payload: authorSearchData.data })
    }
  }, [authorSearchData.data, dispatch]);

  console.log(authorSearchData.data)

  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={authorSearchData.isPending} />
    </div>
  )
}

export default AuthorPageResults;
