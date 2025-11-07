import React from 'react'

import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {

  const searchParam = useParams();

  console.log(searchParam.bookid);

  return (
    <div>BookDetailsPage</div>
  )
}

export default BookDetailsPage;