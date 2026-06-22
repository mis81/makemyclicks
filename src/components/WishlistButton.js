'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '@/hooks/useWishlist'

export default function WishlistButton({ productId, style }) {
  const { toggle, isWishlisted } = useWishlist()
  const active = isWishlisted(productId)

  return (
    <motion.button
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        toggle(productId)
      }}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.15 }}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: active
          ? 'var(--rose)'
          : 'rgba(245,240,232,0.95)',
        border: active
          ? '1px solid var(--rose)'
          : '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        boxShadow: active
          ? '0 4px 12px rgba(201,116,138,0.4)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
        ...style,
      }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={active ? 'filled' : 'empty'}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={active ? '#ffffff' : 'none'}
          stroke={active ? '#ffffff' : 'var(--muted)'}
          strokeWidth="1.8"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </motion.svg>
      </AnimatePresence>

      {/* Burst animation on add */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'var(--rose)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
