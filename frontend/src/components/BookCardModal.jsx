import { createPortal } from "react-dom";
import { AnimatePresence, motion } from 'framer-motion';
import BookModalContent from "./BookModal/BookModalContent";
import Loading from "./Loading.jsx";

const BookCardModal = ({ workData, isModal, setIsModal, isLoading, isError, refetch }) => {
  const mockWorkData = {
    title: "The Adventures of Sherlock Holmes",
    covers: [12059372],
    description: "The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, first published on 14 October 1892. It contains the earliest short stories featuring the consulting detective Sherlock Holmes, which had been published in twelve monthly issues of The Strand Magazine from July 1891 to June 1892. The stories are collected in the same sequence, which is not supported by any fictional chronology. The only characters common to all twelve are Holmes and Dr. Watson and all are related in first-person narrative from Watson's point of view. Contains: [Scandal in Bohemia](https://openlibrary.org/works/OL14930611W) [Red-headed League](https://openlibrary.org/works/OL14930336W) [Case of Identity](https://openlibrary.org/works/OL14929939W) [Boscombe Valley Mystery](https://openlibrary.org/works/OL18495288W) [Five Orange Pips](https://openlibrary.org/works/OL1518120W) [Man with the Twisted Lip](https://openlibrary.org/works/OL14930258W) [Adventure of the Blue Carbuncle](https://openlibrary.org/works/OL1518317W) [Adventure of the Speckled Band](https://openlibrary.org/works/OL262561W)",
    authors: [{ author: { key: "/authors/OL23919A" } }],
    subjects: ["Mystery", "Detective", "Fiction", "Classic Literature", "British Literature", "Short Stories", "Crime", "Victorian Era", "London"]
  }
  return createPortal(
    <AnimatePresence>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo" height="300%" y="-100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 2 18 -7" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      {isModal && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 h-full"
          onClick={() => setIsModal()}
        >
          {isLoading && (
            <div>
              <div className="text-white text-sm">Loading...</div>
            </div>
          )}
          {isError && (
            <div>
              <div className="text-red-400 text-sm">Failed to load book details. Try again later.</div>
              <button className="cursor-pointer text-white" onClick={(e) => { refetch(); e.stopPropagation() }}>retry.</button>
            </div>
          )}
          {workData && !isError && (
            <BookModalContent workData={workData} isModal={isModal} />
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}; export default BookCardModal;
