import { useEffect, useState } from 'react';

export default function useFetch(fetchFunction){
  const [isLoading, setIsLoading] = useState(true);
  const [data , setData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFunction();
        setData(data);
      } catch(err) {
        console.error("Status " , err.response.status);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  });
  
  return { data , isLoading };
}