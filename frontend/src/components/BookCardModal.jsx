import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import BookModalContent from "./BookModal/BookModalContent";

const BookCardModal = ({ workData, isModal, setIsModal }) => {
  return createPortal(
    <AnimatePresence>
      {/* needs a svg parent */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        {/* defs tag is like defining a variable though instead of a variable you define all kinds of things and you can use it by getting the id of the tag you created using url(#someId)*/}
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
      {/* this is the goo effect very useful */}


      {isModal && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50"
          onClick={() => setIsModal(false)}
        >
          <BookModalContent workData={workData} isModal={isModal} />
          {/* <motion.div */}
          {/*   key="modal-content" */}
          {/*   initial={{ scale: 0.95, opacity: 0 }} */}
          {/*   animate={{ scale: 1, opacity: 1 }} */}
          {/*   exit={{ scale: 0.95, opacity: 0 }} */}
          {/*   transition={{ duration: 0.3 }} */}
          {/*   className="bg-white p-4 rounded shadow-lg" */}
          {/*   onClick={(e) => e.stopPropagation()} */}
          {/* > */}
          {/*   Modal Content Here */}
          {/* </motion.div> */}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
export default BookCardModal;
