'use client'
import { motion } from 'framer-motion'

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  style,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
