import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatedTextProps {
  text: string | ReactNode;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
}) => {
  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  if (typeof text === "string") {
    const letters = Array.from(text);
    return (
      <motion.h1
        className={className}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    );
  } else {
    // If text is a ReactNode, render it directly (no animation per letter)
    return (
      <motion.h1
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {text}
      </motion.h1>
    );
  }
};

export default AnimatedText;
