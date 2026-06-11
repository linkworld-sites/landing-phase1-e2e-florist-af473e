'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const edits = [
  {
    number: '01',
    season: 'Autumn',
    title: 'The Harvest\nEdit',
    description: 'Pampas, dried rose & cotton stem — gathered in late September.',
    image: '/images/hero.png',
    accent: '#C4856A',
  },
  {
    number: '02',
    season: 'Winter',
    title: 'The Holland\nEdit',
    description: 'Tulip pod, silver lunaria & ruscus — sourced from Westland growers.',
    image: '/images/material.png',
    accent: '#9DA68C',
  },
  {
    number: '03',
    season: 'Year-round',
    title: 'The White\nEdit',
    description: 'Bleached pampas, cotton & honesty — an enduring arrangement in Parchment.',
    image: '/images/detail.png',
    accent: '#F5F0E8',
  },
]

export default function SeasonalEdit() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0vw', '0vw'] : ['0vw', '-200vw']
  )

  return (
    <section
      id="seasonal"
      ref={sectionRef}
      className="relative bg-tannin"
      style={{ height: shouldReduceMotion ? 'auto' : '300vh' }}
      aria-label="Seasonal Edit — curated collections"
    >
      {/* Label above sticky zone */}
      {shouldReduceMotion && (
        <div className="px-8 md:px-14 pt-20 pb-10">
          <p className="font-body text-xs tracking-widest-2 uppercase text-parchment/30 mb-4">Seasonal Edit</p>
          <h2 className="font-display italic text-parchment" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', letterSpacing: '0.04em' }}>
            Curated by season.
          </h2>
        </div>
      )}

      <div className={shouldReduceMotion ? 'px-8 py-10 space-y-16' : 'sticky top-0 h-screen overflow-hidden'}>
        {shouldReduceMotion ? (
          edits.map((edit, i) => (
            <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image src={edit.image} alt={edit.title} fill className="object-cover opacity-70" sizes="100vw" />
              <div className="absolute inset-0 bg-tannin/60 flex flex-col justify-end p-8">
                <p className="font-body text-xs tracking-widest-2 uppercase text-parchment/50 mb-3">{edit.number} — {edit.season}</p>
                <h3 className="font-display italic text-parchment text-4xl" style={{ letterSpacing: '0.04em', lineHeight: 1.1 }}>
                  {edit.title.replace('\n', ' ')}
                </h3>
                <p className="font-body font-light text-sm text-parchment/60 mt-3">{edit.description}</p>
              </div>
            </div>
          ))
        ) : (
          <motion.div
            className="flex h-full"
            style={{ x: xTranslate, width: '300vw' }}
          >
            {edits.map((edit, i) => (
              <EditPanel key={i} edit={edit} index={i} inView={inView} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function EditPanel({
  edit,
  index,
  inView,
}: {
  edit: (typeof edits)[0]
  index: number
  inView: boolean
}) {
  return (
    <div className="relative w-screen h-screen shrink-0 overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src={edit.image}
        alt={edit.title}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-tannin/55" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
        <div className="flex items-start justify-between">
          <motion.p
            className="font-body text-xs tracking-widest-2 uppercase text-parchment/40"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {edit.number} — {edit.season}
          </motion.p>
          <motion.p
            className="font-body text-xs tracking-widest-2 uppercase text-parchment/30"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
          >
            Seasonal Edit
          </motion.p>
        </div>

        <div>
          <motion.h2
            className="font-display italic text-parchment"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8vw)',
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              whiteSpace: 'pre-line',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {edit.title}
          </motion.h2>
          <motion.p
            className="font-body font-light text-sm text-parchment/60 mt-5 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {edit.description}
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
          >
            <a
              href="#collection"
              className="font-body font-light text-xs tracking-widest-2 uppercase border-b pb-0.5 transition-colors duration-300 hover:opacity-70"
              style={{ color: edit.accent, borderColor: edit.accent }}
            >
              View Edit
            </a>
          </motion.div>
        </div>
      </div>

      {/* Panel number watermark */}
      <div
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 font-display italic opacity-[0.06]"
        style={{
          fontSize: '20vw',
          color: '#F5F0E8',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        {edit.number}
      </div>
    </div>
  )
}
