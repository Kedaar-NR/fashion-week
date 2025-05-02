import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WaitlistPopupProps {
  onClose: () => void;
}

const WaitlistPopup = ({ onClose }: WaitlistPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 8 seconds only
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Auto scroll the iframe when it loads
    if (isVisible && iframeRef.current) {
      const scrollIframe = () => {
        const iframeDoc = iframeRef.current?.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.documentElement.scrollTop = 50;
        }
      };

      // Add load event listener to the iframe
      iframeRef.current.addEventListener("load", scrollIframe);

      return () => {
        iframeRef.current?.removeEventListener("load", scrollIframe);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    // Load Tally script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClose = () => {
    onClose();
    navigate("/home");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-50"
          >
            <X size={24} />
          </button>

          <h2
            className="text-3xl font-black text-center mb-6"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            JOIN THE MOVEMENT
          </h2>

          <iframe
            src="https://tally.so/r/walQGB?transparentBackground=1"
            width="100%"
            height="500"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Join the Waitlist"
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              height: "500px",
              border: "none",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitlistPopup;
