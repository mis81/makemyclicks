'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const x = useSpring(mouseX, { stiffness: 3000, damping: 80, mass: 0.1 })
  const y = useSpring(mouseY, { stiffness: 3000, damping: 80, mass: 0.1 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = e => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)
    const onOver = e => {
      if (e.target.closest('a, button, [role="button"]')) setHovering(true)
      else setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) return null

  const size = hovering ? 52 : clicking ? 36 : 44

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
        transition: 'opacity 0.3s ease',
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: hovering
            ? 'var(--rose)'
            : 'rgba(10,10,10,0.85)',
          border: hovering
            ? '2px solid var(--rose)'
            : '2px solid rgba(201,116,138,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          boxShadow: hovering
            ? '0 0 20px rgba(201,116,138,0.4)'
            : '0 2px 12px rgba(0,0,0,0.3)',
        }}
      >
        <motion.span
          animate={{
            fontSize: hovering ? '16px' : '13px',
            color: hovering ? '#ffffff' : 'var(--rose)',
            scale: clicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '13px',
            color: 'var(--rose)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          M
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
