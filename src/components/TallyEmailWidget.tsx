
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TallyEmailWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    // Check if user has dismissed the widget before
    const hasDismissed = localStorage.getItem('tallyWidgetDismissed');
    if (!hasDismissed) {
      // Show the widget after a short delay
      const timer = setTimeout(() => {
        setIsMinimized(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsMinimized(true);
    localStorage.setItem('tallyWidgetDismissed', 'true');
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setIsMinimized(true), 300);
    } else {
      setIsMinimized(false);
      setTimeout(() => setIsOpen(true), 300);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-lg mb-2 w-72 overflow-hidden"
          >
            <div className="p-3 bg-black text-white flex justify-between items-center">
              <h3 className="font-kanit text-sm font-bold">JOIN OUR NEWSLETTER</h3>
              <button onClick={handleDismiss} className="text-white hover:text-gray-300">
                <X size={16} />
              </button>
            </div>
            {isOpen ? (
              <div className="h-[320px]">
                <iframe
                  src="https://tally.so/embed/3yO9AO?alignLeft=1&hideTitle=1&transparentBackground=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Newsletter Signup"
                ></iframe>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Stay updated with the latest fashion trends and brand releases.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full bg-black text-white py-2 rounded font-kanit hover:bg-gray-800 transition-colors"
                >
                  Subscribe Now
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        {isMinimized ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        ) : (
          <X size={20} />
        )}
      </motion.button>
    </div>
  );
};

export default TallyEmailWidget;
