import { motion, AnimatePresence } from "framer-motion";

export default function ShowHideContainer({ show, children }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}          
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
