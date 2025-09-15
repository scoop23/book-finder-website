import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosMain from '../api/axios'

const useFetchAuthorAndTitle = (endpoint , queryKey, title , author, page) => {
  async function fetchFunction() {
    const response = await axiosMain.get(endpoint , {
      params : {
        p1 : title,
        p2 : author,
        page : page
      }
    })
    return response.data;
  }

  const { data , isPending } = useQuery({ queryKey : [queryKey , title , author, page] , queryFn :  fetchFunction})
  return { data, isPending}
}

export default useFetchAuthorAndTitle;