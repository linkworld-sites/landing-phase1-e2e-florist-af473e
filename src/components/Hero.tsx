'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const heroImages = [
  { src: '/images/hero.png', alt: 'Dried arrangement on marble surface' },
  { src: '/images/material.png', alt: 'Pampas grass in golden afternoon light' },
  { src: '/images/detail.png', alt: 'Hanging dried bundles, atelier detail' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [sharpened, setSharpened] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 120])
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.38, 0.7])

  useEffect(() => {
    const t = setTimeout(() => setSharpened(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-tannin"
      aria-label="Hero — Petal & Keep"
    >
      {/* Filmstrip */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imageY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div
              className="w-full h-full"
              initial={{ filter: 'blur(8px)' }}
              animate={{ filter: sharpened ? 'blur(0px)' : 'blur(8px)' }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={heroImages[current].src}
                alt={heroImages[current].alt}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Veil */}
      <motion.div
        className="absolute inset-0 bg-tannin"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Wordmark */}
        <motion.h1
          className="font-display italic text-parchment text-center"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 11vw)',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
          }}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: sharpened ? 1 : 0.15 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Petal & Keep
        </motion.h1>

        <motion.p
          className="font-body text-parchment/60 tracking-widest-18 uppercase text-xs mt-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sharpened ? 0.7 : 0, y: sharpened ? 0 : 16 }}
          transition={{ duration: 1.4, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Not fresh. Kept.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sharpened ? 1 : 0, y: sharpened ? 0 : 16 }}
          transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#collection"
            className="font-body font-light text-xs tracking-widest-2 uppercase text-parchment/80 border-b border-dried-rose/50 pb-0.5 hover:text-dried-rose hover:border-dried-rose transition-colors duration-300"
            whileTap={{ opacity: 0.6 }}
          >
            View Collection
          </motion.a>
        </motion.div>
      </div>

      {/* Filmstrip dots — text labels, no visible dot-nav */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: sharpened ? 1 : 0 }}
        transition={{ delay: 3, duration: 1.2 }}
      >
        <motion.div
          className="w-px bg-parchment/30 origin-top"
          animate={{ height: ['0px', '56px', '0px'] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.5 }}
        />
        <span className="font-body text-parchment/30 tracking-widest-2 uppercase text-[9px]">Scroll</span>
      </motion.div>
    </section>
  )
}
