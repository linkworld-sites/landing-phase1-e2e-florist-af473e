'use client'
import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const workshops = [
  {
    image: '/images/process.png',
    title: 'Wreath Making',
    caption: 'A two-hour session on seasonal wreath composition. All materials included.',
    date: 'Every Saturday',
  },
  {
    image: '/images/hero.png',
    title: 'Dried Bouquet Studio',
    caption: 'Learn to select, dry and arrange your own botanical bouquet over four weeks.',
    date: 'Monthly intake',
  },
  {
    image: '/images/material.png',
    title: 'Pampas & Grain',
    caption: 'An afternoon with pampas, wheat and rye — building large-scale arrangements.',
    date: 'Seasonal only',
  },
  {
    image: '/images/detail.png',
    title: 'Pressed Botanicals',
    caption: 'Pressing, mounting and framing — a quiet studio morning for 6 participants.',
    date: 'By application',
  },
  {
    image: '/images/process.png',
    title: 'Private Studio Day',
    caption: 'A full day in the atelier with a lead florist. For groups of two to four.',
    date: 'On request',
  },
]

export default function WorkshopCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()
  const [dragging, setDragging] = useState(false)

  const cardWidth = 280
  const gap = 20
  const totalWidth = workshops.length * (cardWidth + gap)
  const constraintLeft = -(totalWidth - (typeof window !== 'undefined' ? window.innerWidth - 112 : 800))

  return (
    <section
      id="workshops"
      ref={sectionRef}
      className="bg-linen-fog py-20 md:py-28 overflow-hidden"
      aria-label="Workshop carousel"
    >
      <div className="px-8 md:px-14 mb-12 flex items-baseline justify-between">
        <motion.h2
          className="font-display italic text-tannin"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', letterSpacing: '0.04em', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The Workshops
        </motion.h2>
        <motion.p
          className="hidden md:block font-body text-xs tracking-widest-2 uppercase text-tannin/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Drag to explore
        </motion.p>
      </div>

      <motion.div
        ref={trackRef}
        className="flex gap-5 pl-8 md:pl-14 pr-8"
        drag={shouldReduceMotion ? false : 'x'}
        dragConstraints={{ right: 0, left: constraintLeft }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 40 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{ width: 'max-content', cursor: dragging ? 'grabbing' : 'grab' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {workshops.map((workshop, i) => (
          <WorkshopCard key={i} workshop={workshop} index={i} inView={inView} />
        ))}
      </motion.div>
    </section>
  )
}

function WorkshopCard({
  workshop,
  index,
  inView,
}: {
  workshop: (typeof workshops)[0]
  index: number
  inView: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="shrink-0 select-none"
      style={{ width: 280 }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
    >
      {/* Image with grain */}
      <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          className="object-cover pointer-events-none"
          sizes="280px"
          draggable={false}
        />
        {/* Grain overlay */}
        <div className="grain-layer" aria-hidden="true" />
        {/* Tint */}
        <div className="absolute inset-0 bg-tannin/10" />
      </div>

      {/* Caption */}
      <div className="space-y-1.5">
        <p className="font-body font-light text-xs tracking-widest-18 uppercase text-tannin">
          {workshop.title}
        </p>
        <p className="font-body font-light text-xs text-tannin/50 leading-relaxed">
          {workshop.caption}
        </p>
        <p className="font-display italic text-dried-rose text-sm" style={{ letterSpacing: '0.04em' }}>
          {workshop.date}
        </p>
      </div>
    </motion.div>
  )
}
