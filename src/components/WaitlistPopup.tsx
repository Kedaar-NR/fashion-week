import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WaitlistPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-[90%] max-w-lg bg-white rounded-xl shadow-xl z-50 p-8"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="text-center">
              <h2
                className="text-4xl font-black mb-4"
                style={{ fontFamily: "Arial Black, sans-serif" }}
              >
                JOIN THE WAITLIST
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Be the first to know what we launch next
              </p>
              <div className="w-full overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src="https://tally.so/r/walQGB"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Join the Waitlist"
                  style={{
                    minWidth: "100%",
                    marginTop: "-50px",
                  }}
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistPopup;
