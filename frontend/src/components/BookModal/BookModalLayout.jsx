import { motion } from "framer-motion";

const BookModalLayout = ({ workData, isModal }) => {

  if (workData && isModal) {
    console.log(workData);
  }
  return (
    <motion.div className="modal-content flex flex-row w-full h-full p-4 bg-white">

    </motion.div>
  )
}

export default BookModalLayout
