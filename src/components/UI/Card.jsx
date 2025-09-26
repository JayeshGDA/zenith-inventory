import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({ children, className, hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
