import React, { useEffect } from 'react'
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';
import { useContext } from 'react';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useQuery } from '@tanstack/react-query';
import { fetchBookByTitleOL } from '../../../api/AccessToApi';


const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');
  const { state, dispatch } = useContext(BookSearchContext);

  // const {isPending : isPending, data : data} = useFetchData(searchQuery , '/search/title')
  // const { data, isPending } = useFetchDataTitleSearch(
  //   searchQuery + "Text",
  //   "/search/title",
  //   searchQuery,
  //   pageParams,
  // );

  const titleSearchData = useQuery({
    queryKey: ["titlesearchdata", searchQuery],
    queryFn: () => fetchBookByTitleOL(searchQuery),
    enabled: !!searchQuery,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: "SET_BOOK_DATA", payload: data });
  //   }
  //   // dispatch({ type : "SET_BOOK_DATA" , payload : data});
  //
  // }, [data, dispatch])

  useEffect(() => {
    if (titleSearchData.data) {
      dispatch({ type: "SET_BOOK_DATA", payload: titleSearchData.data });
    }
  }, [titleSearchData.data, dispatch])


  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={titleSearchData.isPending} />
    </div>
  )
}

export default TitlePageResults;
