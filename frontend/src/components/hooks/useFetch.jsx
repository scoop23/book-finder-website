import { useEffect, useState } from 'react';

export default function useFetch(fetchFunction){
  const [isLoading, setIsLoading] = useState(true);
  const [data , setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFunction();
        setData(data);
      } catch(err) {
        console.error("Status " , err.response.status);
        if(err.response) {
          setError(err.response);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [fetchFunction]);
  
  return { data , isLoading, error };
}