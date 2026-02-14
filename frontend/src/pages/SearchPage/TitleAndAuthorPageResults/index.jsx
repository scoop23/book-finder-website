import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetchAuthorAndTitle from '../../../hooks/useFetchAuthorAndTitle';
import BookResults from '../../../components/BookResults';
import { BookSearchContext } from '../../../context/BookSearchContext';
import { useQuery } from '@tanstack/react-query';
import { fetchBookAuthorAndTitleOL } from '../../../api/AccessToApi.jsx';
//TODO:  fetch data from openlib using authot and title.

const TitleAndAuthorPageResults = () => {
  const { state, dispatch } = useContext(BookSearchContext);
  const [searchParams] = useSearchParams();

  // const title = searchParams.get("p1");
  // const author = searchParams.get("p2");
  // const page = searchParams.get("page");
  //
  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const page = searchParams.get("page");

  // const { data, isPending } = useFetchAuthorAndTitle(
  //   '/search/author-title',
  //   encodeURIComponent(title + " " + author),
  //   title,
  //   author,
  //   page
  // );
  //
  const authorTitleSearchData = useQuery({
    queryKey: ["authortitlesearch", title, author, page],
    queryFn: () => fetchBookAuthorAndTitleOL(title, page, author),
    enabled: !!(title && author),
    retry: 1,
    refetchOnWindowFocus: false
  })


  useEffect(() => {
    if (authorTitleSearchData.data) {
      dispatch({ type: "SET_BOOK_DATA", payload: authorTitleSearchData.data })
    }
  }, [authorTitleSearchData.data, dispatch]);

  return (
    <div className='h-full'>
      <BookResults data={state.bookData} isPending={authorTitleSearchData.isPending} />
    </div>
  )
}

export default TitleAndAuthorPageResults;
