import React from 'react';
import { motion } from 'framer-motion';

export default function PageWrapper({ children }) {
  return (
    <motion.div
      style={{ height: '100%', width: '100%' }}
      initial={false}
      animate={false}
      exit={false}
    >
      {children}
    </motion.div>
  );
}
