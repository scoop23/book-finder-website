import React from 'react'
import { useState , useEffect } from 'react';
import axiosMain from '../api/axios';

export const useFetchData = (queryKey , endpoint) => {

  const [isLoading , setIsLoading] = useState(false);
  const [data , setData] = useState(null);

  async function fetchFunction() {
    const response = await axiosMain.get(endpoint);
  }

  const {data , }


  return {}
}
