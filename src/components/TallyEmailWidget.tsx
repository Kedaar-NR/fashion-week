
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

const TallyEmailWidget = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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

  useEffect(() => {
    // Handle clicks outside the form to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && isFormOpen) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  const handleDismiss = () => {
    setIsMinimized(true);
    localStorage.setItem('tallyWidgetDismissed', 'true');
  };

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
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
                onClick={handleToggleForm}
                className="w-full bg-black text-white py-2 rounded font-kanit hover:bg-gray-800 transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            ref={formRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-16 right-4 bg-white rounded-lg shadow-lg p-3 w-96 h-[500px] z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Newsletter Signup</h3>
              <button onClick={() => setIsFormOpen(false)} className="hover:bg-gray-100 rounded-full p-1">
                <X size={18} />
              </button>
            </div>
            <div className="w-full h-[460px] overflow-hidden">
              <iframe
                src="https://tally.so/r/walQGB"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Newsletter Signup Form"
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {!isFormOpen && isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 right-0 bg-black text-white py-1 px-3 rounded-md text-sm whitespace-nowrap"
            >
              Join the movement
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={handleToggleForm}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          <Mail size={20} />
        </button>
      </div>
    </div>
  );
};

export default TallyEmailWidget;
