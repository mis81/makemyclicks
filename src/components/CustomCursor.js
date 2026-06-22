'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Outer ring — slightly behind mouse for smooth trail
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.3 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.3 })

  // Inner dot — sticks tightly to mouse
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.1 })

  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches) return

    const onMove = e => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)
    const onOver = e => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
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

  return (
    <>
      {/* Outer ring — smooth trail */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        <motion.div
          animate={{
            width:  hovering ? 44 : clicking ? 28 : 36,
            height: hovering ? 44 : clicking ? 28 : 36,
            borderColor: hovering ? 'var(--rose)' : 'rgba(201,116,138,0.7)',
            backgroundColor: hovering
              ? 'rgba(201,116,138,0.12)'
              : 'transparent',
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid rgba(201,116,138,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </motion.div>

      {/* Inner dot — tight follow */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        <motion.div
          animate={{
            width:  hovering ? 6 : clicking ? 3 : 5,
            height: hovering ? 6 : clicking ? 3 : 5,
            backgroundColor: hovering ? 'var(--rose)' : '#0A0A0A',
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: '#0A0A0A',
          }}
        />
      </motion.div>
    </>
  )
}
