'use client'
import { useState, useEffect } from 'react'

export function useWishlist() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('mmc_wishlist') || '[]')
    setWishlist(stored)
  }, [])

  function toggle(productId) {
    setWishlist(prev => {
      const exists = prev.includes(productId)
      const updated = exists
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
      localStorage.setItem('mmc_wishlist', JSON.stringify(updated))
      return updated
    })
  }

  function isWishlisted(productId) {
    return wishlist.includes(productId)
  }

  return { wishlist, toggle, isWishlisted }
}
