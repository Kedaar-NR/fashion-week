
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

const TallyEmailWidget = () => {
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

  const handleOpenForm = () => {
    window.open('https://tally.so/r/walQGB', '_blank');
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
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Stay updated with the latest fashion trends and brand releases.
              </p>
              <button
                onClick={handleOpenForm}
                className="w-full bg-black text-white py-2 rounded font-kanit hover:bg-gray-800 transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleOpenForm}
        className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        <Mail size={20} />
      </button>
    </div>
  );
};

export default TallyEmailWidget;
