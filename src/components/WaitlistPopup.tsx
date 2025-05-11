
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistPopup = ({ isOpen, onClose }: WaitlistPopupProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-black text-center mb-6">
          Join our waitlist
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Be the first to know when we launch.
        </p>
        <Button
          onClick={() => {
            onClose();
            navigate("/waitlist");
          }}
          className="w-full bg-black hover:bg-gray-800 text-white text-xl py-6 rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105"
        >
          Join Waitlist
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistPopup;
