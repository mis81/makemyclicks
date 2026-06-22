'use client'
import { motion } from 'framer-motion'

export default function ImageReveal({ src, alt, style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* The sliding curtain */}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ink)',
          transformOrigin: 'right',
          zIndex: 2,
        }}
      />
      {/* The image underneath */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
