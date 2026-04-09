import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import bookImage from '../../assets/book_empty.png';
import ModalContentGenres from "./ModalContentGenres";
import ContentAuthors from "./ContentAuthors";
import DescriptionWithLinks from "./DescriptionWithLinks";
import Recommendations from "./Recommendations";
import ModalButtons from "./ModalButtons";
import { parseDescription } from "./utils";
import { parentVariant, secondChildVariant, secondParentVariant, containerVariant } from "./variants";

const BookModalContent = ({ workData, isModal }) => {
  const primaryContainerRef = useRef(null);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [visibleHeight, setVisibleHeight] = useState(400);
  const [showLinks, setShowLinks] = useState(false);

  let scrollWidth = ''

  useLayoutEffect(() => {
    if (!primaryContainerRef.current) return;
    const fullHeight = primaryContainerRef.current.scrollHeight + 20;
    scrollWidth = primaryContainerRef.current.scrollWidth;
    // const realHeight = Math.ceil(primaryContainerRef.current.getBoundingClientRect().height) + 100;
    const currentHeight = isPrimaryHovered ? fullHeight : 400;
    setVisibleHeight(currentHeight);
    // Only consider it "long" if current visible height >= 556
  }, [isPrimaryHovered, workData, showLinks]);

  const isPrimaryLong = visibleHeight >= 556;
  const isPrimaryVeryLong = visibleHeight >= 768;
  const isLarge = visibleHeight >= 800;
  // console.log(visibleHeight)
  console.log(scrollWidth)

  const computedHeight = isPrimaryHovered
    ? (isLarge ? 800 : visibleHeight)
    : (isLarge ? visibleHeight : 400)

  // console.log(isPrimaryLong + " & " + isPrimaryHovered);
  function checkHovered() {
  }

  // ??
  if (workData && isModal) {
    if (typeof (workData?.description) === "object") {
      // console.log("data is a object")
      // console.log(workData?.description?.value)
    }
  }

  const coverUrl = workData?.covers ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg` : undefined;

  const rawDescription = typeof workData?.description === 'object'
    ? workData?.description.value : workData?.description || "no description available.";

  const { description, links } = parseDescription(rawDescription)
  console.log(computedHeight)

  return (
    <motion.div className="modal-content flex flex-row w-[1200px] h-full p-4">
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
            animate={{
              height: computedHeight,
              y: isPrimaryVeryLong ? -40 : isLarge ? -600 : 0,
              width: isLarge ? 1000 : undefined
            }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => { setIsPrimaryHovered(true); checkHovered() }}
            onMouseLeave={() => { setIsPrimaryHovered(false); checkHovered() }}
          >
            <div className="cover-authors gap-4 flex flex-col items-center">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={workData?.title}
                  className="max-w-[300px] h-[250px] object-cover rounded-2xl"
                />
              ) : (<img
                src={bookImage}
                alt={workData?.title}
                className="max-w-[300px] h-[250px] object-cover rounded-2xl"
              />)}

              {workData?.authors && (
                <ContentAuthors data={workData.authors} />
              )}
            </div>
            <div className="title-description flex flex-col gap-2">
              <h2 className="text-xl font-bold">{workData?.title}</h2>
              <p className={`text-gray-600`} >{description}</p>
              {links.length > 1 &&
                <DescriptionWithLinks
                  setShowLinks={setShowLinks}
                  showLinks={showLinks}
                  matches={links}
                  setIsPrimaryHovered={setIsPrimaryHovered}
                  isPrimaryHovered={isPrimaryHovered}
                />}
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
              {!isPrimaryLong &&
                <motion.div key="recommendations"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", duration: 0.2 }}
                  className="flex gap-2">
                  <Recommendations /> {/*   */}
                  {/*
                <motion.div layout className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
                  Recommended 1
                </motion.div>
                <motion.div layout className="additions bg-white recom-container w-[350px] h-[250px] rounded-2xl">
                  Recommended 2
                </motion.div>

                */}
                </motion.div>
              }
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right / secondary container */}
      <motion.div
        className="secondary-container flex flex-col px-4 mt-25  h-full gap-4 items-center justify-start"
        variants={secondParentVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalButtons />
      </motion.div>
    </motion.div >
  );
};
export default BookModalContent;
