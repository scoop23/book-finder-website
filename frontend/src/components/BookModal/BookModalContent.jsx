import { motion } from "framer-motion";

const BookModalContent = ({ workData, isModal }) => {
  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      console.log("data is a object")
      console.log(workData?.description?.value)
    }
  }

  const containerVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring" } },
    exit: { scale: 0.7, opacity: 0 }
  }

  return (
    <motion.div className="modal-content flex flex-row w-[1200px] h-[800px] p-4">
      <motion.div className="primary-container min-w-[700px] h-full rounded-2xl flex flex-col gap-4 justify-baseline items-center">
        <motion.div layout variants={containerVariant} initial={"hidden"} animate={"visible"} exit={"exit"} className="book-content p-4 h-[400px] w-[700px] bg-white rounded-2xl">
          {/* content here? */}
        </motion.div>

        <motion.div className="flex flex-row gap-2 rounded-2xl">
          <motion.div className="additions bg-white w-[350px] h-[250px] rounded-2xl">

          </motion.div>
          <motion.div className="additions bg-white w-[350px] h-[250px] rounded-2xl" >

          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="secondary-container flex flex-col px-4 mt-8 w-full h-full gap-4 items-center">
        {
          [1, 2, 3, 4, 5].map(n => {
            return (
              <motion.div className="bg-white w-full rounded-2xl px-4">
                {n}
              </motion.div>
            )
          })
        }
      </motion.div>
    </motion.div>
  )
}

export default BookModalContent;
