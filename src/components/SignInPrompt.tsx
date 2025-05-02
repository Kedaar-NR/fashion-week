import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SignInPromptProps {
  variant?: "overlay" | "popup" | "tooltip";
  onClose?: () => void;
}

const SignInPrompt = ({ variant = "overlay", onClose }: SignInPromptProps) => {
  if (variant === "tooltip") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 z-50"
      >
        <Link
          to="/signin"
          className="text-sm font-medium text-gray-900 whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          Sign in
        </Link>
      </motion.div>
    );
  }

  if (variant === "popup") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
          className="bg-white rounded-xl p-8 flex flex-col items-center max-w-sm mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign Up To View
          </h2>
          <Link
            to="/signin"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Sign in
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-40"
    >
      <p className="text-white text-lg font-medium mb-3">Sign in to view</p>
      <Link
        to="/signin"
        className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        Sign In
      </Link>
    </motion.div>
  );
};

export default SignInPrompt;
