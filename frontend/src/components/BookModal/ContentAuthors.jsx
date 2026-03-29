import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fetchAuthors } from "../../api/AccessToApi";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContentAuthors = ({ data }) => {
  const [isButton, setIsButton] = useState(false);
  const authorBtnRef = useRef(null);
  const authorKeys = data.map((a) => {
    let raw = a.author?.key.split('/');
    if (!raw) {
      raw = a.key.split('/')
    }
    const authorKey = raw[2]
    return authorKey;
  })

  useEffect(() => {
    if (!authorBtnRef.current) return;
    const rect = authorBtnRef.current.getBoundingClientRect();
    console.log(rect);
  }, []);

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
      <motion.div className="flex flex-col">
        <button
          onClick={() => setIsButton(!isButton)}
          className="rounded-2xl bg-violet-600 text-white p-2"
          ref={authorBtnRef}>
          Authors
        </button>

        {isButton && createPortal(
          <div className="authors inset-0 text-gray-700 flex flex-col fixed h-[300px] w-[300px] bg-amber-50 z-51"
            style={{
            }}>
            {authorQueries.map((q, index) => {
              const authorName = q.data?.data?.name || "Unknown Author";
              return <div key={index}>{authorName}</div>;
            })}
          </div>, document.body
        )
        }
      </motion.div>
    </AnimatePresence >
  )
}

export default ContentAuthors;
