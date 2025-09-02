import React from 'react'
import BookResults from '../../../components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';

const AuthorPageResults = () => {
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
    
  return (
    <div>
      <BookResults data={data} isPending={isPending}/>
    </div>
  )
}

export default AuthorPageResults;