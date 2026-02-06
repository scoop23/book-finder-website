import React from 'react'
import axiosMain from '../api/axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchDataTitleSearch = (queryKey, endpoint, title, page) => {
  async function fetchFunction() {
    const response = await axiosMain.get(endpoint, {
      params: {
        q: title, // endpoint + ?q="title" || author
        page: page // endpoint + ?q="title"&startIndex=page ? send as page in the backend
      }
    }); // http://localhost:8080 + endpoint so could be /search/title
    return response.data;
  }

  const { isPending, error, data } = useQuery({ queryKey: [queryKey, title, page], queryFn: fetchFunction });

  return { isPending, error, data };
}

