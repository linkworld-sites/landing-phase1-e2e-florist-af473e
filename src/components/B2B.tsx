'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

function CharShift({ text, className = '' }: { text: string; className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {text}
      </span>
    )
  }

  return (
    <motion.span className={`inline-flex ${className}`} whileHover="hover">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hover: {
              color: '#C4856A',
              transition: { delay: i * 0.015, duration: 0.2 },
            },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function B2B() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="b2b"
      ref={sectionRef}
      className="bg-tannin"
      aria-label="B2B — Hotels and Restaurants"
    >
      <div className="grid md:grid-cols-2 min-h-screen md:min-h-[80vh]">
        {/* Left — moody photograph */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/process.png"
              alt="Dried arrangement on a restaurant table at dusk"
              fill
              className="object-cover opacity-75"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-tannin/40" />
          </motion.div>

          {/* Atmospheric overlay — candlelit warmth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 70% at 35% 75%, rgba(196,133,106,0.18) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Right — sparse copy */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 md:py-24">
          <motion.p
            className="font-body text-xs tracking-widest-2 uppercase text-parchment/30 mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hotels & Restaurants
          </motion.p>

          <motion.h2
            className="font-display italic text-parchment mb-8"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', letterSpacing: '0.04em', lineHeight: 1.15 }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            For tables that remember<br />their flowers.
          </motion.h2>

          <motion.p
            className="font-body font-light text-sm text-parchment/55 leading-relaxed max-w-xs mb-8"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We work quietly with a small number of hotels, restaurants and private dining rooms — arranging pieces that stay for months, not days.
          </motion.p>

          <motion.p
            className="font-body font-light text-sm text-parchment/55 leading-relaxed max-w-xs mb-12"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Ongoing supply, seasonal replacements, bespoke commissions. No contract required. No minimum order for first enquiries.
          </motion.p>

          <motion.a
            href="mailto:partnerships@petalandkeep.com"
            className="font-body font-light text-sm text-parchment border-b border-parchment/30 pb-0.5 w-fit hover:border-dried-rose transition-colors duration-500 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <CharShift text="Enquire about partnerships" />
          </motion.a>

          <motion.div
            className="mt-16 pt-8 border-t border-parchment/10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <p className="font-body text-[10px] tracking-widest-18 uppercase text-parchment/20">
              Currently working with venues in Amsterdam, London & Copenhagen
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
