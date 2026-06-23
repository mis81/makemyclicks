'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const LOGOS = [
  {
    img: 'https://i.ibb.co/jvY8x33G/Chat-GPT-Image-Jun-23-2026-12-50-37-PM.png',
    textColor: '#0A0A0A',
    accentColor: '#E63027',
    label: 'Colorful',
  },
  {
    img: 'https://i.ibb.co/VWq9W4vp/Chat-GPT-Image-Jun-23-2026-12-50-42-PM.png',
    textColor: '#C9A96E',
    accentColor: '#C9A96E',
    label: 'Gold',
  },
  {
    img: 'https://i.ibb.co/TqdD3B7V/Chat-GPT-Image-Jun-23-2026-12-50-48-PM.png',
    textColor: '#C9748A',
    accentColor: '#C9748A',
    label: 'Rose',
  },
]

export default function AnimatedLogo({ isTransparent = false }) {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const t = setInterval(() => {
      setCurrent(prev => (prev + 1) % LOGOS.length)
    }, 3000)
    return () => clearInterval(t)
  }, [isHovered])

  const logo = LOGOS[current]

  return (
    <Link
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {/* Morphing logo image */}
      <div style={{
        position: 'relative',
        width: '38px',
        height: '38px',
        flexShrink: 0,
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={logo.img}
            alt="MakeMyClicks"
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 30 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Brand name with color transition */}
      <motion.span
        animate={{
          color: isTransparent ? '#ffffff' : logo.textColor,
        }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '20px',
          letterSpacing: '0.04em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        MAKE
        <motion.span
          animate={{ color: logo.accentColor }}
          transition={{ duration: 0.5 }}
        >
          MY
        </motion.span>
        CLICKS
      </motion.span>

      {/* Dot indicators below logo */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        left: '0',
        display: 'flex',
        gap: '4px',
      }}>
        {LOGOS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? '12px' : '4px',
              background: i === current
                ? logo.accentColor
                : 'rgba(0,0,0,0.2)',
            }}
            transition={{ duration: 0.3 }}
            onClick={e => {
              e.preventDefault()
              setCurrent(i)
            }}
            style={{
              height: '3px',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </Link>
  )
}
