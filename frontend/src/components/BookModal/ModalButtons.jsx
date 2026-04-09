import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from 'framer-motion';
import { secondChildVariant } from "./variants";

const ModalButtons = () => {
  const myButtons = [
    <FontAwesomeIcon icon={"heart"} />,
    <FontAwesomeIcon icon={"bookmark"} />,
    <FontAwesomeIcon icon={"arrow-right-to-bracket"} />
  ]

  return (
    <>
      {myButtons.map((n, i) => (
        <motion.div
          key={i}
          className="long-buttons bg-white w-full rounded-2xl p-4 flex cursor-pointer"
          variants={secondChildVariant}
          role="button"
          onClick={(e) => e.stopPropagation()}
        >
          {n}
        </motion.div>
      ))}
    </>
  )
}

export default ModalButtons
