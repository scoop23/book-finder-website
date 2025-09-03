import React from 'react'
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router-dom';
import { useFetchDataTitleSearch } from '@/hooks/useFetchDataTitleSearch';


const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');

  // const {isPending : isPending, data : data} = useFetchData(searchQuery , '/search/title')
  const {data , isPending} = useFetchDataTitleSearch(
    searchQuery + "Text",
    "/search/title", 
    searchQuery,
    pageParams,
  );
    
  return (
    <div className='h-full'>
      <BookResults data={data} isPending={isPending}/>
    </div>
  )
}

export default TitlePageResults;