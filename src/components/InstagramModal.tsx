import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramModalProps {
  brandName: string;
  onClose: () => void;
}

const InstagramModal = ({ brandName, onClose }: InstagramModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg w-full max-w-4xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="h-[80vh] w-full">
            <iframe
              src={`https://www.instagram.com/${brandName}/embed`}
              className="w-full h-full border-none"
              title={`${brandName} Instagram Feed`}
              loading="eager"
              scrolling="no"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstagramModal;
