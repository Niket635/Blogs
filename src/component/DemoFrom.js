import React from 'react'
import { motion } from 'framer-motion';




function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Hello, world!</h1>
      <p>Welcome to my website.</p>
    </motion.div>
  );
}


export default MyComponent;

