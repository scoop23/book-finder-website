import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchPagePaginationResults = ({ totalPages }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page');



  return (
    <div>

    </div>
  )
}

export default SearchPagePaginationResults