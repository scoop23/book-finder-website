import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import bookImage from '../../assets/book_empty.png';

const BookModalContent = ({ workData, isModal }) => {
  const primaryContainerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [height, setHeight] = useState(0);
  const [isPrimaryLong, setIsPrimaryLong] = useState(false);

  useLayoutEffect(() => {
    if (primaryContainerRef.current) {
      setHeight(primaryContainerRef.current.scrollHeight + 20);
      setIsPrimaryLong(primaryContainerRef.current.offsetHeight >= 672);
    }

  }, [isPrimaryHovered])

  function checkHovered() {
    console.log(isPrimaryLong + " & " + isPrimaryHovered);
  }

  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      // console.log("data is a object")
      // console.log(workData?.description?.value)
    }
  }

  const coverUrl = workData.covers ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg` : null;
  const description = typeof workData.description === 'object'
    ? workData.description.value : workData.description || "no description available.";

  const containerVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3, type: "spring" } },
    exit: { scale: 0.7, opacity: 0, }
  }

  const parentVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0, opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { scale: 0.7, opacity: 0, pointerEvents: "none", transition: { duration: 1, staggerChildren: 0.1 } }
  }

  const secondParentVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: {
      x: 50, opacity: 0, transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const secondChildVariant = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, type: "spring" } },
    exit: { x: -30, opacity: 0 }
  }

  return (
    <motion.div className="modal-content flex flex-row w-[1200px] h-full p-4">
      <motion.div
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="primary-container min-w-[700px] h-full rounded-2xl flex flex-col gap-4 justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book main content */}
        <motion.div
          variants={containerVariant}
          layout
          className="book-content p-4 w-[700px] bg-white rounded-2xl flex flex-row gap-4 overflow-hidden"
          ref={primaryContainerRef}
          animate={{ height: isPrimaryHovered ? height : 400 }}
          onMouseEnter={() => { setIsPrimaryHovered(true); checkHovered() }}
          onMouseLeave={() => { setIsPrimaryHovered(false); checkHovered() }}
        >
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={workData.title}
              className="max-w-[300px] h-[250px] object-cover rounded-2xl"
            />
          ) : (<img
            src={bookImage}
            alt={workData.title}
            className="max-w-[300px] h-[250px] object-cover rounded-2xl"
          />)}
          {workData.authors && (
            <p className="text-gray-700">
              {workData.authors.map((a) => a.name).join(", ")}
            </p>
          )}
          <div className="title-description flex flex-col gap-2">
            <h2 className="text-xl font-bold">{workData.title}</h2>
            <p className="text-gray-600">{description}</p>
            <div className="subjects flex flex-wrap gap-1">
              {
                workData?.subjects?.length > 6 ? (
                  workData?.subjects.slice(0, 5).map((sub, i) => (
                    <button className="genre-btn bg-gray-600 p-2 text-white" key={i}>{sub}</button>
                  ))
                ) : (
                  workData?.subjects?.map((subject, index) => (
                    <button className="genre-btn bg-gray-600 p-2 text-white" key={index}>{subject}</button>
                  ))
                )
              }
              {
                workData?.subjects?.length > 6 && (
                  <button className="p-2">see more</button>
                )
              }

            </div>
          </div>
        </motion.div>

        <motion.div className="flex flex-row gap-2 rounded-2xl">
          <motion.div variants={containerVariant} className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
            Recommended 1
          </motion.div>
          <motion.div variants={containerVariant} className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
            Recommended 2
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right / secondary container */}
      <motion.div
        className="secondary-container flex flex-col px-4 mt-8 w-full h-full gap-4 items-center justify-start"
        variants={secondParentVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {[1, 2, 3, 4, 5].map((n, i) => (
          <motion.div
            key={i}
            className="bg-white w-full rounded-2xl p-4"
            variants={secondChildVariant}
          >
            Extra content {n}
          </motion.div>
        ))}
      </motion.div>
    </motion.div >
  );
};
export default BookModalContent;
