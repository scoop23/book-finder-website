import React, { useEffect } from 'react';
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';
import SearchPagePaginationResults from '../../../components/SearchPagePaginationResults';
import { useContext, useState } from 'react';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useQuery } from '@tanstack/react-query';
import { fetchBookByTitleOL } from '../../../api/AccessToApi';


const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');
  const { state, dispatch } = useContext(BookSearchContext);
  const [isLoading, setIsLoading] = useState(false);

  const titleSearchData = useQuery({
    queryKey: ["titlesearchdata", searchQuery, pageParams],
    queryFn: () => fetchBookByTitleOL(searchQuery, pageParams),
    enabled: !!searchQuery,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })


  useEffect(() => {
    console.log(titleSearchData);
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
