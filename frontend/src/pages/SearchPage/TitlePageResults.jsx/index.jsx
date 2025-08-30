import React from 'react'
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router-dom';


const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');

  console.log(searchQuery)
  console.log(pageParams)

  return (
    <div>
      <BookResults />
    </div>
  )
}

export default TitlePageResults;