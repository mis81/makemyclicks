'use client'
import { motion } from 'framer-motion'

export default function ScaleOnHover({ children, scale = 1.02, style, className }) {
  return (
    <motion.div
      whileHover={{ scale, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      whileTap={{ scale: 0.98 }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
