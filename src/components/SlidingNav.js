'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',              href: '/' },
  { label: 'T-Shirts',          href: '/tshirts' },
  { label: 'Collections',       href: '/collections' },
  { label: 'Mousepads',         href: '/mousepads' },
  { label: 'Corporate Gifting', href: '/corporate' },
  { label: 'Raw Materials',     href: '/products?cat=raw-materials' },
  { label: 'Machines',          href: '/machines' },
]

export default function SlidingNav() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const pathname = usePathname()

  return (
    <nav
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        position: 'relative',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {NAV_LINKS.map((link, i) => {
        const isActive  = pathname === link.href
        const isHovered = hoveredIndex === i

        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(i)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: isHovered
                ? '#ffffff'
                : isActive
                  ? '#C9748A'
                  : '#888078',
              transition: 'color 0.2s ease',
              zIndex: 1,
              borderRadius: '999px',
              whiteSpace: 'nowrap',
            }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  layoutId="nav-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{
                    layout: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    },
                    opacity: { duration: 0.15 },
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '999px',
                    background: '#0A0A0A',
                    zIndex: -1,
                  }}
                />
              )}
            </AnimatePresence>

            {link.label}

            {isActive && !isHovered && (
              <span style={{
                position: 'absolute',
                bottom: '2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#C9748A',
              }} />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
