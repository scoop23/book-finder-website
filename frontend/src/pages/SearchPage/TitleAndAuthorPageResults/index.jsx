import React from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetchAuthorAndTitle from '../../../hooks/useFetchAuthorAndTitle';
import BookResults from '../../../components/BookResults';

const TitleAndAuthorPageResults = () => {
  const [searchParams] = useSearchParams();

  const title = searchParams.get("p1");
  const author = searchParams.get("p2");
  const page = searchParams.get("startIndex");

  const { data , isPending } = useFetchAuthorAndTitle(
    '/search/author-title',
    encodeURIComponent(title + " " + author),
    title,
    author,
    page
  )

  return (
    <div className='h-full'>
      <BookResults data={data} isPending={isPending}/>
    </div>
  )
}

export default TitleAndAuthorPageResults;