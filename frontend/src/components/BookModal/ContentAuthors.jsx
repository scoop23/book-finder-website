import { useEffect, useState } from "react";
import { fetchAuthors } from "../../api/AccessToApi";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AnimatePresence } from 'framer-motion';

const ContentAuthors = ({ data }) => {
  const [isButton, setIsButton] = useState(false);
  console.log(data);
  const authorKeys = data.map((a) => {
    const raw = a.author.key.split('/');
    const authorKey = raw[2]
    return authorKey;
  })

  const authorQueries = useQueries({
    queries: authorKeys.map((authorKey) => ({
      queryKey: ["author", authorKey],
      queryFn: () => fetchAuthors(authorKey),
      enabled: !!authorKey,
      staleTime: 5 * 60 * 1000,
    }))
  });

  const isLoading = authorQueries.some((q) => q.isLoading);
  const isError = authorQueries.some((q) => q.isError);

  if (isLoading) return <div>Loading authors...</div>;
  if (isError) return <div>Failed to load authors.</div>;

  return (
    <AnimatePresence>
      <button onClick={() => setIsButton(!isButton)} className="rounded-2xl bg-violet-600 text-white p-2">Authors</button>
      {isButton && (
        <div className="authors text-gray-700">
          {authorQueries.map((q, index) => {
            const authorName = q.data?.data?.name || "Unknown Author";
            return <div key={index}>{authorName}</div>;
          })}
        </div>
      )
      }

    </AnimatePresence>
  )
}

export default ContentAuthors
