'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
    dropdown: null,
  },
  {
    label: 'T-Shirts',
    href: '/tshirts',
    dropdown: [
      { label: 'All T-Shirts', href: '/tshirts' },
      { label: 'Oversized Fit', href: '/tshirts?cat=oversized' },
      { label: 'Art Prints', href: '/tshirts?cat=art' },
      { label: 'Big & Tall', href: '/tshirts?cat=tall' },
      { label: 'Premium Cotton', href: '/tshirts?cat=premium' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
    dropdown: [
      { label: 'All Collections', href: '/collections' },
      { label: 'New Arrivals', href: '/products' },
      { label: 'Bestsellers', href: '/products?cat=bestseller' },
      { label: 'Limited Edition', href: '/products?cat=limited' },
    ],
  },
  {
    label: 'Mousepads',
    href: '/mousepads',
    dropdown: [
      { label: 'All Mousepads', href: '/mousepads' },
      { label: 'Gaming Pads', href: '/mousepads?cat=gaming' },
      { label: 'Desk Pads XL', href: '/mousepads?cat=xl' },
      { label: 'Art Prints', href: '/mousepads?cat=art' },
    ],
  },
  {
    label: 'Corporate Gifting',
    href: '/corporate',
    dropdown: [
      { label: 'Gift Packages', href: '/corporate#packages' },
      { label: 'Bulk Orders', href: '/corporate#enquiry' },
      { label: 'Get a Quote', href: '/corporate#enquiry' },
    ],
  },
  {
    label: 'Raw Materials',
    href: '/products?cat=raw-materials',
    dropdown: null,
  },
  {
    label: 'Machines',
    href: '/machines',
    dropdown: [
      { label: 'All Machines', href: '/machines' },
      { label: 'DTF Printers', href: '/machines?cat=dtf' },
      { label: 'UV DTF Printers', href: '/machines?cat=uv' },
      { label: 'Complete Sets', href: '/machines?cat=complete' },
    ],
  },
]

export default function SlidingNav({ transparent = false }) {
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
        margin: 0,
        padding: 0,
      }}
    >
      {NAV_LINKS.map((link, i) => {
        const isActive  = pathname === link.href || pathname?.startsWith(link.href + '?')
        const isHovered = hoveredIndex === i
        const hasDropdown = link.dropdown && link.dropdown.length > 0

        return (
          <div
            key={link.href}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredIndex(i)}
          >
            {/* Nav Item */}
            <Link
              href={link.href}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
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
                    : transparent
                      ? 'rgba(255,255,255,0.75)'
                      : '#888078',
                transition: 'color 0.2s ease',
                zIndex: 1,
                borderRadius: '999px',
                whiteSpace: 'nowrap',
              }}
            >
              {/* Sliding pill background */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    layoutId="nav-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{
                      layout: { type: 'spring', stiffness: 400, damping: 30 },
                      opacity: { duration: 0.15 },
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      background: transparent ? 'rgba(255,255,255,0.15)' : '#0A0A0A',
                      zIndex: -1,
                    }}
                  />
                )}
              </AnimatePresence>

              {link.label}

              {/* Chevron for items with dropdown */}
              {hasDropdown && (
                <motion.span
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '10px',
                    opacity: 0.6,
                  }}
                >
                  ▾
                </motion.span>
              )}

              {/* Active dot */}
              {isActive && !isHovered && (
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: transparent ? 'rgba(255,255,255,0.6)' : '#C9748A',
                }} />
              )}
            </Link>

            {/* ── DROPDOWN MENU ── */}
            <AnimatePresence>
              {isHovered && hasDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#ffffff',
                    border: '1px solid #E5E3DC',
                    borderRadius: '10px',
                    padding: '8px',
                    minWidth: '180px',
                    zIndex: 999,
                    boxShadow: '0 8px 32px rgba(10,10,10,0.12), 0 2px 8px rgba(10,10,10,0.06)',
                  }}
                >
                  {/* Small triangle pointer */}
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '50%',
                    width: '10px',
                    height: '10px',
                    background: '#ffffff',
                    border: '1px solid #E5E3DC',
                    borderRight: 'none',
                    borderBottom: 'none',
                    transform: 'translateX(-50%) rotate(45deg)',
                  }} />

                  {link.dropdown.map((item, j) => (
                    <Link
                      key={item.href + j}
                      href={item.href}
                      onClick={() => setHoveredIndex(null)}
                      style={{
                        display: 'block',
                        padding: '9px 14px',
                        fontSize: '12px',
                        letterSpacing: '0.04em',
                        color: '#888078',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 400,
                        transition: 'background 0.15s, color 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#F5F0E8'
                        e.currentTarget.style.color = '#0A0A0A'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#888078'
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
