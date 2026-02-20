import { motion } from "framer-motion";

const BookModalContent = ({ workData, isModal }) => {
  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      console.log("data is a object")
      console.log(workData?.description?.value)
    }
  }



  return (
    <motion.div className="modal-content flex flex-row w-[1200px] h-[800px] p-4 bg-yellow-100/50">
      <motion.div className="primary-container w-[700px] h-full bg-amber-500/20 rounded-2xl flex flex-col gap-4 justify-center">
        <motion.div className="book-content p-4 h-[100px] w-[300px] bg-white rounded-2xl">
          {/* content here? */}

        </motion.div>
        <motion.div className="flex h-full flex-row gap-2 bg-green-50">
          <motion.div className="additions bg-red w-[100px] h-[100px]">

          </motion.div>
          <motion.div className="additions bg-blue w-[100px] h-[100px]" >

          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="secondary-container flex flex-col p-4">

      </motion.div>
    </motion.div>
  )
}

export default BookModalContent;
