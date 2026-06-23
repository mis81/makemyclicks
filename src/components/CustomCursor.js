'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const CURSOR_LABELS = {
  '[data-cursor="shop"]':    'SHOP',
  '[data-cursor="add"]':     'ADD',
  '[data-cursor="explore"]': 'EXPLORE',
  '[data-cursor="view"]':    'VIEW',
  '[data-cursor="enquire"]': 'ENQUIRE',
  '[data-cursor="details"]': 'DETAILS',
  '[data-cursor="cart"]':    'CART',
  'a':                       'VIEW',
  'button':                  'CLICK',
  'input':                   'TYPE',
  'textarea':                'TYPE',
}

function getLabel(el) {
  if (!el) return null
  for (const [selector, label] of Object.entries(CURSOR_LABELS)) {
    if (el.closest && el.closest(selector)) return label
  }
  return null
}

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false)
  const [label, setLabel]       = useState(null)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const x = useSpring(mouseX, { stiffness: 3000, damping: 80, mass: 0.1 })
  const y = useSpring(mouseY, { stiffness: 3000, damping: 80, mass: 0.1 })

  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches) return

    const onMove = e => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      setLabel(getLabel(e.target))
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
        zIndex: 99999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
      }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key="label"
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: clicking ? 0.92 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 6 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: '#0A0A0A',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              padding: '7px 14px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {label}
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: clicking ? 0.6 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#C9748A',
              userSelect: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
