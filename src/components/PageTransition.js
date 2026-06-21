'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [stage, setStage] = useState('entered')
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    setStage('exiting')
    const t1 = setTimeout(() => {
      setDisplayChildren(children)
      setStage('entering')
    }, 250)
    const t2 = setTimeout(() => {
      setStage('entered')
    }, 600)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [pathname, children])

  useEffect(() => {
    setDisplayChildren(children)
  }, [children])

  return (
    <div style={{
      opacity: stage === 'exiting' ? 0 : 1,
      transform: stage === 'exiting' ? 'translateY(-8px)' : stage === 'entering' ? 'translateY(12px)' : 'translateY(0)',
      transition: stage === 'exiting'
        ? 'opacity 0.25s ease, transform 0.25s ease'
        : 'opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s',
      minHeight: '60vh',
    }}>
      {displayChildren}
    </div>
  )
}
