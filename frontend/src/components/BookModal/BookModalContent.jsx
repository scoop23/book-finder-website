import { motion } from "framer-motion";

const BookModalContent = ({ workData, isModal }) => {
  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      console.log("data is a object")
      console.log(workData?.description?.value)
    }
  }

  return (
    <motion.div className="modal-content flex flex-row w-[1200px] h-[800px] p-4">
      <motion.div className="primary-container min-w-[700px] h-full rounded-2xl flex flex-col gap-4 justify-center items-center"> 
        <motion.div className="book-content p-4 h-[400px] w-[700px] bg-white rounded-2xl"> {/* content here? */} 
        </motion.div> 
          
        <motion.div className="flex flex-row gap-2 rounded-2xl"> 
          <motion.div className="additions bg-red-500 w-[350px] h-[250px] rounded-2xl">

          </motion.div>
          <motion.div className="additions bg-blue-500 w-[350px] h-[250px] rounded-2xl" >

          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="secondary-container flex flex-col p-4">
        {
          [1,2,3,4,5].map(n => {
            return (
              <div className="bg-white ">
              {n}
              </div>
            )
          })
        }
      </motion.div>
    </motion.div>
  )
}

export default BookModalContent;
