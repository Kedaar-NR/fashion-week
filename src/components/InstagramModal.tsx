import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramModalProps {
  brandName: string;
  onClose: () => void;
}

const InstagramModal = ({ brandName, onClose }: InstagramModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">@{brandName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="rounded-xl overflow-hidden aspect-square w-full relative">
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
  );
};

export default InstagramModal;
