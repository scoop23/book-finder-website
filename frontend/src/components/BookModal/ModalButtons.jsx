import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from 'framer-motion';
import { secondChildVariant } from "./variants";

const ModalButtons = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((n, i) => (
        <motion.div
          key={i}
          className="long-buttons bg-white w-full rounded-2xl p-4 "
          variants={secondChildVariant}
        >
          Extra content {n}
        </motion.div>
      ))}
    </>
  )
}

export default ModalButtons
