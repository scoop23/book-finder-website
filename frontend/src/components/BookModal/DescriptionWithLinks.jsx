import { AnimatePresence, motion } from "framer-motion"

const DescriptionWithLinks = ({ matches }) => {
  return (
    <motion.div className="links flex flex-col gap-2">
      {
        matches.map((matchedLink, index) => {
          const { title, url } = matchedLink;
          return (
            <div className="" key={index}>
              {title} {'->'} {url}
            </div>
          )
        })
      }
    </motion.div>
  )
}

export default DescriptionWithLinks
