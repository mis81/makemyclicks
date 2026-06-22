'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 1200, damping: 50, mass: 0.2 })
  const springY = useSpring(cursorY, { stiffness: 1200, damping: 50, mass: 0.2 })

  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 60, mass: 0.1 })
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 60, mass: 0.1 })

  useEffect(() => {
    const move = e => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const enter = () => setIsHovering(true)
    const leave = () => setIsHovering(false)

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [isVisible, cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: '1.5px solid var(--rose)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: isHovering ? '6px' : '4px',
          height: isHovering ? '6px' : '4px',
          background: 'var(--rose)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  )
}
