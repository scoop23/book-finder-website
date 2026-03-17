import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import bookImage from '../../assets/book_empty.png';
import ModalContentGenres from "./ModalContentGenres";
import ContentAuthors from "./ContentAuthors";

const BookModalContent = ({ workData, isModal }) => {
  const primaryContainerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [visibleHeight, setVisibleHeight] = useState(400);
  const [isPrimaryLong, setIsPrimaryLong] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  useLayoutEffect(() => {
    if (!primaryContainerRef.current) return;

    const fullHeight = primaryContainerRef.current.scrollHeight + 20;
    // const realHeight = Math.ceil(primaryContainerRef.current.getBoundingClientRect().height) + 100;
    const currentHeight = isPrimaryHovered ? fullHeight : 400;
    setVisibleHeight(currentHeight);

    // Only consider it "long" if current visible height >= 592
    setIsPrimaryLong(currentHeight >= 592);
  }, [isPrimaryHovered, workData]);

  console.log(visibleHeight)

  // console.log(isPrimaryLong + " & " + isPrimaryHovered);
  function checkHovered() {
  }


  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      // console.log("data is a object")
      // console.log(workData?.description?.value)
    }
  }

  const coverUrl = workData?.covers ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg` : null;
  const description = typeof workData?.description === 'object'
    ? workData?.description.value : workData?.description || "no description available.";

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
    <motion.div className="modal-content flex flex-row w-[1200px] h-full p-4" layout>
      <motion.div
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="primary-container min-w-[700px] h-full rounded-2xl flex flex-col gap-4 mt-25 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book main content */}
        <motion.div className="flex flex-col gap-2 w-full" layout>
          <motion.div className="book-content p-4 w-[700px] bg-white rounded-2xl flex flex-row gap-4 overflow-hidden"
            variants={containerVariant}
            layout
            ref={primaryContainerRef}
            animate={{ height: isPrimaryHovered ? visibleHeight : 400 }}
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
              <ContentAuthors data={workData.authors} />
            )}
            <div className="title-description flex flex-col gap-2">
              <h2 className="text-xl font-bold">{workData.title}</h2>
              <p className={`text-gray-600`} >{description}</p>
              <div className="subjects flex flex-wrap gap-1">
                <ModalContentGenres genresData={workData?.subjects} />
                {
                  workData?.subjects?.length > 6 && (
                    <button className="p-2 border-2 border-green-800 cursor-pointer">see more genres.</button>
                  )
                }
              </div>
            </div>
          </motion.div>

          <motion.div className="flex flex-row gap-2 rounded-2xl" layout>
            <AnimatePresence>
              {!isPrimaryLong && <motion.div key="recommendations"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="flex gap-2">
                <motion.div layout className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
                  Recommended 1
                </motion.div>
                <motion.div layout className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
                  Recommended 2
                </motion.div>
              </motion.div>
              }
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right / secondary container */}
      <motion.div
        className="secondary-container flex flex-col px-4 mt-25 w-full h-full gap-4 items-center justify-start"
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
