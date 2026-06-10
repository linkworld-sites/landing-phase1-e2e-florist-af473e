'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const items = [
  'EU-Wide Shipping',
  'Hand-Packed in Amsterdam',
  'Plastic-Free',
  'Made to Order',
]

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      className="bg-dried-rose py-8 md:py-10"
      aria-label="Shipping and trust information"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 md:px-14">
        {items.map((item, i) => (
          <motion.div
            key={item}
            className="text-center"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-body font-light text-parchment"
              style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                lineHeight: 1.4,
              }}
            >
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
