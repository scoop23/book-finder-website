import React from 'react'
import BookResults from '@/components/BookResults';
import { useSearchParams } from 'react-router';

const TitlePageResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const pageParams = searchParams.get('page');


  return (
    <div>
      <BookResults />
    </div>
  )
}

export default TitlePageResults;