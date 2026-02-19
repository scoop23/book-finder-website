import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const BookCardModal = ({ workData, isModal, setIsModal }) => {
  return createPortal(
    <AnimatePresence>
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
          <motion.div
            key="modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            Modal Content Here
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
export default BookCardModal;
