import React, { useContext } from 'react'
import BookResults from '../../../components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useEffect } from 'react';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';
import { useQuery } from '@tanstack/react-query';
import { fetchBookByAuthoOL } from '../../../api/AccessToApi';
// TODO: fetch data as author from openlib

const AuthorPageResults = () => {
  const { state, dispatch } = useContext(BookSearchContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');

  console.log(searchQuery)
  console.log(pageParams)

  // const {isPending : isPending, data : data} = useFetchData(searchQuery , '/search/title')
  // const { data, isPending } = useFetchDataTitleSearch(
  //   searchQuery + "Text",
  //   "/search/author",
  //   searchQuery,
  //   pageParams,
  // );

  const authorSearchData = useQuery({
    queryKey: ["authersearchdata", searchQuery, pageParams],
    queryFn: () => fetchBookByAuthoOL(searchQuery, pageParams),
    enabled: !!searchQuery,
    retry: 1,
    refetchOnWindowFocus: false,
  });


  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: "SET_BOOK_DATA", payload: data });
  //   }
  // }, [data, dispatch]);
  useEffect(() => {
    if (authorSearchData) {
      dispatch({ type: "SET_BOOK_DATA", payload: authorSearchData.data })
    }
  }, [authorSearchData.data, dispatch]);

  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={isPending} />
    </div>
  )
}

export default AuthorPageResults;
