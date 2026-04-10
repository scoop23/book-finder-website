import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";

const DescriptionWithLinks = ({ setShowLinks, showLinks, matches, setIsPrimaryHovered, isPrimaryHovered }) => {
  const [page, setPage] = useState(1);
  const pagedLinks = matches.slice((page - 1) * 10, page * 10);
  console.log(page)
  console.log(matches)

  useEffect(() => {
    if (!isPrimaryHovered) {
      setPage(1)
    }
  }, [isPrimaryHovered])

  return (
    <motion.div className="links flex flex-col gap-2">
      <div className="buttons flex justify-between">
        <button className="text-blue-400 flex flex-wrap cursor-pointer"
          onClick={() => {
            const isOpening = !showLinks;
            setShowLinks(isOpening);
            setIsPrimaryHovered(isOpening);
          }}>Works</button>
        {showLinks &&
          <div className="page-options">
            <button onClick={() => setPage(page => Math.max(1, page - 1))}>
              prev page
            </button>
            <button onClick={() => setPage(page => Math.min(pagedLinks.length, page + 1))}>
              next page
            </button>
          </div>
        }
      </div>
      <AnimatePresence>
        {showLinks &&
          pagedLinks.map((matchedLink, index) => {
            const { title, url } = matchedLink;
            return (
              <div className="flex flex-col" key={index}>
                <span className="shrink-0">{title}</span>
                <a
                  href={url}
                  className="text-blue-400 break-all text-xs"  // ← break-all forces URL to wrap
                  target="_blank"
                >
                  {url}</a>
              </div>
            )
          })
        }
      </AnimatePresence>
    </motion.div >
  )
}

export default DescriptionWithLinks
