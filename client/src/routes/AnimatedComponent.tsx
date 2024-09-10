import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimatedComponent: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedComponent;
