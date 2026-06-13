'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'The Craft', href: '#craft' },
  { label: 'Seasonal Edit', href: '#seasonal' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Journal', href: '/blog' },
]

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="relative font-body font-light text-xs tracking-widest-2 uppercase text-parchment group"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-dried-rose"
        variants={{
          hover: { width: '100%' },
        }}
        initial={{ width: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.a>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-6 transition-all duration-700 ${
        scrolled
          ? 'bg-tannin/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <motion.a
        href="#"
        className="font-display italic text-parchment"
        style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', letterSpacing: '0.04em' }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      >
        Petal & Keep
      </motion.a>

      <ul className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>

      <motion.a
        href="#b2b"
        className="hidden md:block font-body font-light text-xs tracking-widest-2 uppercase text-parchment/70 hover:text-dried-rose transition-colors duration-300"
      >
        Enquire
      </motion.a>
    </motion.nav>
  )
}
