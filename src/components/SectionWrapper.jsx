import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen flex items-center justify-center"
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
