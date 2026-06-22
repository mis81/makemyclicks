'use client'
import { motion } from 'framer-motion'

export default function TextReveal({ text, style, className, delay = 0 }) {
  const words = text.split(' ')

  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', ...style }} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
