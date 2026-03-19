import { createPortal } from "react-dom";
import { AnimatePresence, motion } from 'framer-motion';
import BookModalContent from "./BookModal/BookModalContent";
import Loading from "./Loading.jsx";

const BookCardModal = ({ workData, isModal, setIsModal, isLoading, isError, refetch }) => {
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 h-full"
          onClick={() => setIsModal(false)}
        >
          {isLoading && (
            <div>
              <div className="text-white text-sm">Loading...</div>
            </div>
          )}
          {isError && (
            <div>
              <div className="text-red-400 text-sm">Failed to load book details. Try again later.</div>
              <button className="" onClick={(e) => { refetch(), e.stopPropagation() }}>retry.</button>
            </div>
          )}
          {workData && (
            <BookModalContent workData={workData} isModal={isModal} />
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}; export default BookCardModal;
