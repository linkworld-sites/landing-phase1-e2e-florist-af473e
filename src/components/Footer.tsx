'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'The Craft', href: '#craft' },
  { label: 'Seasonal Edit', href: '#seasonal' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Journal', href: '/blog' },
  { label: 'Partnerships', href: '#b2b' },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer
      ref={ref}
      className="bg-tannin px-8 md:px-14 py-16 md:py-20"
      aria-label="Footer"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14 md:gap-0">
        {/* Left */}
        <motion.div
          className="max-w-xs"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#"
            className="font-display italic text-parchment block mb-5"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.04em' }}
          >
            Petal & Keep
          </a>
          <p className="font-body font-light text-sm text-parchment/50 leading-relaxed">
            Some things are worth keeping.
          </p>
          <p className="font-body font-light text-xs text-parchment/30 mt-4 leading-relaxed">
            Botanical preservation studio<br />
            Amsterdam, Netherlands
          </p>
        </motion.div>

        {/* Right */}
        <motion.div
          className="flex flex-col gap-6 md:items-end"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col md:items-end gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="font-body font-light text-xs tracking-widest-2 uppercase text-parchment/50 hover:text-dried-rose transition-colors duration-300 relative group"
                    whileHover="hover"
                  >
                    <motion.span
                      className="absolute -bottom-0.5 right-0 h-px bg-dried-rose"
                      variants={{ hover: { width: '100%' } }}
                      initial={{ width: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col md:items-end gap-2 mt-4">
            <motion.a
              href="https://instagram.com/petalandkeep"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-light text-xs tracking-widest-2 uppercase text-parchment/30 hover:text-parchment/70 transition-colors duration-300"
              aria-label="Petal & Keep on Instagram"
            >
              @petalandkeep
            </motion.a>
            <a
              href="mailto:hello@petalandkeep.com"
              className="font-body font-light text-xs text-parchment/25 hover:text-parchment/50 transition-colors duration-300"
            >
              hello@petalandkeep.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="mt-16 pt-6 border-t border-parchment/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="font-body text-[10px] tracking-widest-18 uppercase text-parchment/20">
          © {new Date().getFullYear()} Petal & Keep. All rights reserved.
        </p>
        <p className="font-body text-[10px] tracking-widest-18 uppercase text-parchment/15">
          KvK 87654321 — Amsterdam
        </p>
      </motion.div>
    </footer>
  )
}
