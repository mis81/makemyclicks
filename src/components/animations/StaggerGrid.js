'use client'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function StaggerGrid({ children, style, className }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, style, className }) {
  return (
    <motion.div
      variants={itemVariants}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
