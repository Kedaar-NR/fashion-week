
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WaitlistCounter = () => {
  const [count, setCount] = useState(10057);
  const maxCount = 15000;
  const minCount = 10057;

  // Function to format number with commas
  const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format the count into an array of characters (digits and commas) for animation
  const formatNumber = (num: number) => {
    return formatNumberWithCommas(num).split("");
  };

  const [digits, setDigits] = useState(formatNumber(count));

  useEffect(() => {
    // Function to get a random timeout between 1-2 seconds (slightly faster without going too fast)
    const getRandomTimeout = () => Math.floor(Math.random() * 1000) + 1000;

    // Function to get random increment between 1-3 to reduce updates
    const getRandomIncrement = () => Math.floor(Math.random() * 3) + 1;

    // Increment counter function with random timing
    const incrementCounter = () => {
      setCount((prevCount) => {
        // Calculate new count
        const increment = getRandomIncrement();
        const newCount =
          prevCount + increment >= maxCount ? minCount : prevCount + increment;

        // Update digits for animation
        setDigits(formatNumber(newCount));

        return newCount;
      });

      // Schedule the next increment with random timing
      setTimeout(incrementCounter, getRandomTimeout());
    };

    // Start the counter with initial random delay
    const timerId = setTimeout(incrementCounter, getRandomTimeout());

    // Cleanup
    return () => clearTimeout(timerId);
  }, []);

  return (
    <span className="inline-flex text-[#ea384c] font-medium">
      {digits.map((char, index) => (
        <AnimatePresence mode="popLayout" key={`${index}-container`}>
          <motion.span
            key={`${index}-${count}`}
            className="inline-block overflow-hidden"
            style={{
              position: "relative",
              width: char === "," ? "0.25em" : "0.65em",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${index}-${char}-${count}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </AnimatePresence>
      ))}
    </span>
  );
};

export default WaitlistCounter;
