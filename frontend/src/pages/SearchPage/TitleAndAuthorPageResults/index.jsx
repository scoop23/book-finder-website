import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetchAuthorAndTitle from '../../../hooks/useFetchAuthorAndTitle';
import BookResults from '../../../components/BookResults';
import { BookSearchContext } from '../../../context/BookSearchContext';

const TitleAndAuthorPageResults = () => {
  const {dispatch} = useContext(BookSearchContext);
  const [searchParams] = useSearchParams();

  const title = searchParams.get("p1");
  const author = searchParams.get("p2");
  const page = searchParams.get("page");


  const { data , isPending } = useFetchAuthorAndTitle(
    '/search/author-title',
    encodeURIComponent(title + " " + author),
    title,
    author,
    page
  );

  useEffect(() => {
    if(data) {
      dispatch({ type : "SET_BOOK_DATA" , payload : data })
    }
  }, [data , dispatch]);

  return (
    <div className='h-full'>
      <BookResults data={data} isPending={isPending}/>
    </div>
  )
}

export default TitleAndAuthorPageResults;